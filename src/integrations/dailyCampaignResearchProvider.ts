import type { ExternalResearchProvider as CanonicalResearchProvider } from './externalResearchProvider';
import type { ExternalResearchProvider as RuntimeResearchProvider } from '../agents/researchMatchRuntime';
import type { ResearchSignal } from '../agents/researchAgent';

/** Bridges the canonical search provider to the Research→Match runtime contract. */
export function createDailyCampaignResearchProvider(
  provider: CanonicalResearchProvider,
): RuntimeResearchProvider {
  return {
    async collect({ accountId, companyName, domain, contactIds, contactNames, contactTitles, geography }): Promise<ResearchSignal[]> {
      const documents = await provider.search({
        accountId,
        companyName,
        domain,
        geography,
        contactIds,
        contactNames,
        contactTitles,
        maxSignals: 12,
      });

      return documents.map((document) => ({
        id: document.id,
        claim: document.excerpt || document.title,
        sourceUrl: document.url,
        sourceType: document.sourceType,
        confidence: document.confidence,
        observedAt: document.observedAt,
      }));
    },
  };
}
