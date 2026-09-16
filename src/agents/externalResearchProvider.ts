import type { ResearchSignal, ResearchSourceType } from './researchAgent';

export interface ExternalResearchQuery {
  accountId: string;
  companyName: string;
  domain?: string;
  personaNames?: string[];
  maxSignals?: number;
}

export interface ExternalResearchDocument {
  url: string;
  title?: string;
  sourceType?: ResearchSourceType;
  publishedAt?: string;
  retrievedAt?: string;
  text: string;
}

export interface ExternalResearchProvider {
  search(query: ExternalResearchQuery): Promise<ExternalResearchDocument[]>;
}

const MAX_SIGNALS = 12;

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const inferSourceType = (url: string): ResearchSourceType => {
  const host = new URL(url).hostname.toLowerCase();
  if (host.includes('linkedin.com')) return 'linkedin';
  return 'public-web';
};

const normalizeText = (value: string): string => value.replace(/\s+/g, ' ').trim();

/**
 * Converts externally retrieved documents into the Research Agent's sourced
 * evidence contract. The provider never invents claims: each signal is a
 * verbatim document-derived sentence and retains its source URL.
 */
export function documentsToResearchSignals(
  documents: ExternalResearchDocument[],
  maxSignals = MAX_SIGNALS,
): ResearchSignal[] {
  const seen = new Set<string>();
  const signals: ResearchSignal[] = [];

  for (const document of documents) {
    const url = document.url.trim();
    const text = normalizeText(document.text);
    if (!isHttpUrl(url) || !text || seen.has(url)) continue;

    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map(normalizeText)
      .filter((sentence) => sentence.length >= 35);

    const candidates = sentences.length > 0 ? sentences : [text];
    for (const claim of candidates) {
      if (signals.length >= Math.min(maxSignals, MAX_SIGNALS)) return signals;
      signals.push({
        id: `external-${signals.length + 1}`,
        claim,
        sourceUrl: url,
        sourceType: document.sourceType ?? inferSourceType(url),
        observedAt: document.retrievedAt ?? new Date().toISOString(),
        confidence: document.sourceType === 'company-site' ? 'high' : 'medium',
      });
    }
    seen.add(url);
  }

  return signals;
}

/** Deterministic provider used for unit tests and dry-runs. */
export function createStaticExternalResearchProvider(
  documents: ExternalResearchDocument[],
): ExternalResearchProvider {
  return {
    async search(query) {
      return documents.filter((document) => {
        const haystack = `${document.title ?? ''} ${document.text}`.toLowerCase();
        return haystack.includes(query.companyName.toLowerCase()) || !query.companyName;
      });
    },
  };
}
