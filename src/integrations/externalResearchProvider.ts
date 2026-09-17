import type { ResearchSignal } from '../agents/researchAgent';

export interface ExternalResearchQuery {
  accountId: string;
  companyName: string;
  domain?: string;
  contactIds: string[];
  contactNames?: string[];
  contactTitles?: string[];
  geography?: string;
  maxSignals?: number;
}

export interface ExternalResearchDocument {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  sourceType: 'company-site' | 'linkedin' | 'public-web' | 'news' | 'other';
  observedAt: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface ExternalResearchProvider {
  search(query: ExternalResearchQuery): Promise<ExternalResearchDocument[]>;
  collect(query: ExternalResearchQuery): Promise<ResearchSignal[]>;
}

export function createExternalResearchProvider(
  searchProvider: Pick<ExternalResearchProvider, 'search'>,
): ExternalResearchProvider {
  return {
    search: searchProvider.search,
    async collect(query: ExternalResearchQuery): Promise<ResearchSignal[]> {
      const maxSignals = Math.max(1, Math.min(query.maxSignals ?? 12, 25));
      const documents = await searchProvider.search(query);
      const seen = new Set<string>();

      return documents
        .filter((document) => isHttpUrl(document.url))
        .filter((document) => {
          const key = document.url.trim().toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, maxSignals)
        .map((document, index) => ({
          id: `${query.accountId}-research-${document.id || index + 1}`,
          claim: document.excerpt?.trim() || document.title.trim(),
          sourceUrl: document.url.trim(),
          sourceType: document.sourceType,
          confidence: document.confidence,
          observedAt: document.observedAt,
        }));
    },
  };
}

export function createStaticExternalResearchProvider(
  documents: ExternalResearchDocument[],
): ExternalResearchProvider {
  const normalized = [...documents];
  return createExternalResearchProvider({
    async search(query) {
      return normalized.filter((document) => isHttpUrl(document.url)).slice(0, query.maxSignals ?? 12);
    },
  });
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
