import type { ResearchSignal } from '../agents/researchAgent';

export type ExternalResearchSourceType = Exclude<ResearchSignal['sourceType'], 'hubspot'>;

export interface ExternalResearchQuery {
  accountId: string;
  companyName: string;
  domain?: string;
  contactNames?: string[];
  contactTitles?: string[];
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

/**
 * External research boundary for the Research Agent.
 *
 * The provider owns collection; this adapter owns provenance, URL validation,
 * deduplication and the signal shape consumed by the Research Agent. It does
 * not invent claims when a source omits an excerpt.
 */
export function createExternalResearchProvider(
  options: ExternalResearchProviderOptions,
): ExternalResearchProvider {
  const maxSignals = Math.max(1, Math.min(options.maxSignals ?? MAX_SIGNALS, MAX_SIGNALS));

  return {
    async search(query) {
      if (!query.accountId.trim()) throw new Error('External research requires accountId.');
      if (!query.companyName.trim()) throw new Error('External research requires companyName.');

      const documents = await options.search(query);
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

        if (signals.length >= maxSignals) break;
      }

      return signals;
    },
  };
}

/**
 * Convenience provider for tests and controlled dry-runs. Every document is
 * still passed through the same validation and provenance rules as production.
 */
export function createStaticExternalResearchProvider(
  documents: ExternalResearchDocument[],
  maxSignals = MAX_SIGNALS,
): ExternalResearchProvider {
  return createExternalResearchProvider({
    maxSignals,
    search: async () => documents,
  });
}
