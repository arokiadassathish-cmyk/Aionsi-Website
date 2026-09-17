import type {
  ExternalResearchDocument,
  ExternalResearchProvider as CanonicalResearchProvider,
  ExternalResearchQuery,
} from './externalResearchProvider';
import type { ExternalResearchProvider as RuntimeResearchProvider } from '../agents/researchMatchRuntime';
import type { ResearchSignal } from '../agents/researchAgent';

/** Bridges the canonical search-based provider to the Research→Match runtime contract. */
export function createDailyCampaignResearchProvider(
  provider: CanonicalResearchProvider,
): RuntimeResearchProvider {
  return {
    async collect({ companyName, domain, geography, contactIds }): Promise<ResearchSignal[]> {
      const query: ExternalResearchQuery = {
        accountId: companyName,
        companyName,
        domain,
        contactIds,
        geography,
        maxSignals: 12,
      };

      const documents: ExternalResearchDocument[] = await searchByRuntimeContract(provider, query);

      return documents.map((document) => ({
        id: document.id,
        claim: document.excerpt || document.title,
        sourceUrl: document.url,
        sourceType: document.sourceType === 'company' ? 'company-site' : 'public-web',
        confidence: document.confidence ?? 'medium',
        observedAt: document.observedAt,
      }));
    },
  };
}

/**
 * Keeps the runtime contract explicit and makes it possible to add contact-name/title
 * enrichment later without overloading contactIds with another meaning.
 */
async function searchByRuntimeContract(
  provider: CanonicalResearchProvider,
  query: ExternalResearchQuery,
): Promise<ExternalResearchDocument[]> {
  return provider.search(query);
}
