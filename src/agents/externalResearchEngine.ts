import type { ExternalResearchDocument, ExternalResearchProvider, ExternalResearchQuery } from '../integrations/externalResearchProvider';

export interface ResearchQueryPlan {
  queries: string[];
}

export interface ResearchEngineResult {
  documents: ExternalResearchDocument[];
  queries: string[];
}

/** Builds a small, reusable query set. Collection remains provider-specific. */
export function buildResearchQueryPlan(query: ExternalResearchQuery): ResearchQueryPlan {
  const company = query.companyName.trim();
  const domain = query.domain?.trim();
  const personaNames = query.contactNames?.filter(Boolean).slice(0, 3) ?? [];
  const queries = [
    `${company} semiconductor ASIC SoC engineering`,
    `${company} design verification physical design DFT`,
    `${company} product technology engineering news`,
    ...personaNames.map((name) => `${name} ${company} engineering`),
  ];

  if (domain) queries.unshift(`site:${domain} ${company} technology engineering`);
  return { queries: [...new Set(queries)] };
}

/**
 * Runs a provider against the deterministic query plan and de-duplicates URLs.
 * The provider receives stable company identity plus an explicit searchQuery so
 * downstream providers can preserve provenance and query semantics.
 */
export async function runExternalResearchEngine(
  provider: ExternalResearchProvider,
  query: ExternalResearchQuery,
): Promise<ResearchEngineResult> {
  if (!query.accountId.trim()) throw new Error('Research engine requires accountId.');
  if (!query.companyName.trim()) throw new Error('Research engine requires companyName.');

  const plan = buildResearchQueryPlan(query);
  const documents: ExternalResearchDocument[] = [];
  const seen = new Set<string>();

  for (const plannedQuery of plan.queries) {
    const results = await provider.search({ ...query, searchQuery: plannedQuery });
    for (const document of results) {
      const url = document.url.trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      documents.push(document);
      if (documents.length >= (query.maxSignals ?? 12)) {
        return { documents, queries: plan.queries };
      }
    }
  }

  return { documents, queries: plan.queries };
}
