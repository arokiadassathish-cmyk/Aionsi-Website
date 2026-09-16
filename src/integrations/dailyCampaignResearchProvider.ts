import type { ExternalResearchProvider as CanonicalResearchProvider } from './externalResearchProvider';
import type { ExternalResearchProvider as RuntimeResearchProvider } from '../agents/researchMatchRuntime';
import type { ResearchSignal } from '../agents/researchAgent';

/** Bridges the canonical search-based provider to the Research→Match runtime contract. */
export function createDailyCampaignResearchProvider(
  provider: CanonicalResearchProvider,
): RuntimeResearchProvider {
  return {
    async collect({ companyName, domain, contactIds }): Promise<ResearchSignal[]> {
      const documents = await provider.search({
        accountId: companyName,
        companyName,
        domain,
        contactNames: contactIds,
        maxSignals: 12,
      });

      return documents.map((document) => ({
        id: document.id,
        claim: document.excerpt || document.title,
        sourceUrl: document.url,
        sourceType: document.sourceType === 'company' ? 'company-site' : 'public-web',
        confidence: document.confidence ?? 'medium',
      }));
    },
  };
}
