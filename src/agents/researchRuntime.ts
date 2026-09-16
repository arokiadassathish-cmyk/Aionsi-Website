import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { createHubSpotBackedResearchAgent } from './researchAgentFactory';
import { resolveLiveResearchProvider } from '../integrations/liveResearchProviderConfig';
import type { ResearchSignal } from './researchAgent';
import type { ExternalResearchProvider } from '../integrations/externalResearchProvider';

export interface ResearchRuntimeRequest {
  accountId: string;
  contactIds?: string[];
  externalResearch?: ResearchSignal[];
}

export interface ResearchRuntimeResult {
  signals: ResearchSignal[];
  blockers: string[];
  readyForMatch: boolean;
  liveProviderConfigured: boolean;
}

/**
 * Production composition boundary for Research Agent execution.
 * CRM remains the system of record; live external research is optional and
 * explicitly injected. No CRM mutation or outbound execution occurs here.
 */
export async function runProductionResearch(
  hubspot: HubSpotAdapter,
  request: ResearchRuntimeRequest,
  provider: ExternalResearchProvider | undefined = resolveLiveResearchProvider(),
): Promise<ResearchRuntimeResult> {
  const contextProviderAgent = createHubSpotBackedResearchAgent(hubspot);
  const context = await hubspot.getCampaignContext(request.accountId, request.contactIds);

  const contactNames = context.contacts.map((contact) => contact.firstName && contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.email ?? '').filter(Boolean);
  const contactTitles = context.contacts.map((contact) => contact.jobTitle ?? '').filter(Boolean);

  let externalResearch = request.externalResearch;
  const blockers: string[] = [];

  if (!externalResearch?.length && provider) {
    const documents = await provider.search({
      accountId: request.accountId,
      companyName: context.company.name,
      domain: context.company.domain,
      contactNames,
      contactTitles,
      maxSignals: 12,
    });
    externalResearch = documents.map((document) => ({
      id: document.id,
      claim: document.excerpt ?? document.title,
      sourceUrl: document.url,
      sourceType: document.sourceType,
      confidence: document.confidence ?? 'medium',
    }));
  } else if (!externalResearch?.length) {
    blockers.push('Live research provider is not configured and no external research was supplied.');
  }

  const result = await contextProviderAgent.run({
    context,
    contactIds: request.contactIds,
    externalResearch,
  });

  blockers.push(...result.blockers);

  return {
    signals: result.signals,
    blockers: [...new Set(blockers)],
    readyForMatch: blockers.length === 0 && result.signals.some((signal) => signal.confidence !== 'low'),
    liveProviderConfigured: Boolean(provider),
  };
}
