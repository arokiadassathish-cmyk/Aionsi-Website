import type { ResearchSignal } from '../agents/researchAgent';

export type ExternalResearchSourceType = Exclude<ResearchSignal['sourceType'], 'hubspot'>;

export interface ExternalResearchQuery {
  accountId: string;
  companyName: string;
  domain?: string;
  contactNames?: string[];
  contactTitles?: string[];
  maxSignals?: number;
}

export interface ExternalResearchDocument {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  sourceType: ExternalResearchSourceType;
  observedAt?: string;
  confidence?: ResearchSignal['confidence'];
}

export interface ExternalResearchProvider {
  search(query: ExternalResearchQuery): Promise<ExternalResearchDocument[]>;
}

export interface ExternalResearchProviderOptions {
  search: (query: ExternalResearchQuery) => Promise<ExternalResearchDocument[]>;
  maxSignals?: number;
}

export interface HttpResearchProviderOptions {
  endpoint: string;
  apiKey?: string;
  fetchImpl?: typeof fetch;
  maxSignals?: number;
}

const MAX_SIGNALS = 12;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function normalizeConfidence(confidence?: ResearchSignal['confidence']): ResearchSignal['confidence'] {
  return confidence ?? 'medium';
}

function claimFromDocument(document: ExternalResearchDocument): string {
  const detail = document.excerpt?.trim();
  return detail ? `${document.title}: ${detail}` : document.title;
}

/** Converts trusted documents into the Research Agent's provenance-preserving signal contract. */
export function documentsToResearchSignals(
  documents: ExternalResearchDocument[],
  maxSignals = MAX_SIGNALS,
): ResearchSignal[] {
  const limit = Math.max(1, Math.min(maxSignals, MAX_SIGNALS));
  const seenUrls = new Set<string>();
  const signals: ResearchSignal[] = [];

  for (const document of documents) {
    const url = document.url.trim();
    if (!url || !isHttpUrl(url) || seenUrls.has(url)) continue;
    seenUrls.add(url);
    signals.push({
      id: document.id.trim() || `external-${signals.length + 1}`,
      claim: claimFromDocument(document),
      sourceUrl: url,
      sourceType: document.sourceType,
      observedAt: document.observedAt,
      confidence: normalizeConfidence(document.confidence),
    });
    if (signals.length >= limit) break;
  }

  return signals;
}

export function createExternalResearchProvider(
  options: ExternalResearchProviderOptions,
): ExternalResearchProvider {
  const maxSignals = Math.max(1, Math.min(options.maxSignals ?? MAX_SIGNALS, MAX_SIGNALS));
  return {
    async search(query) {
      if (!query.accountId.trim()) throw new Error('External research requires accountId.');
      if (!query.companyName.trim()) throw new Error('External research requires companyName.');
      const documents = await options.search(query);
      return documents
        .filter((document) => isHttpUrl(document.url.trim()))
        .filter((document, index, all) => all.findIndex((candidate) => candidate.url.trim() === document.url.trim()) === index)
        .slice(0, Math.min(query.maxSignals ?? maxSignals, maxSignals));
    },
  };
}

/** HTTP adapter for an approved external research/search service. */
export function createHttpExternalResearchProvider(
  options: HttpResearchProviderOptions,
): ExternalResearchProvider {
  const fetchImpl = options.fetchImpl ?? fetch;
  const endpoint = options.endpoint.trim();
  if (!endpoint || !isHttpUrl(endpoint)) {
    throw new Error('External research endpoint must be a valid HTTP(S) URL.');
  }

  return createExternalResearchProvider({
    maxSignals: options.maxSignals,
    search: async (query) => {
      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(options.apiKey ? { authorization: `Bearer ${options.apiKey}` } : {}),
        },
        body: JSON.stringify(query),
      });
      if (!response.ok) throw new Error(`External research service returned HTTP ${response.status}.`);
      const payload = (await response.json()) as { documents?: ExternalResearchDocument[] };
      if (!Array.isArray(payload.documents)) throw new Error('External research service returned an invalid document payload.');
      return payload.documents;
    },
  });
}

export function createStaticExternalResearchProvider(
  documents: ExternalResearchDocument[],
  maxSignals = MAX_SIGNALS,
): ExternalResearchProvider {
  return createExternalResearchProvider({ maxSignals, search: async () => documents });
}
