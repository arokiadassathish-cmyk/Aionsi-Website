import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { createHubSpotCampaignContextProvider } from '../integrations/crmCampaignContext';
import type { ExternalResearchProvider } from '../integrations/externalResearchProvider';
import { createResearchAgent, type ResearchAgent, type ResearchBrief, type ResearchSignal } from './researchAgent';

export interface RunResearchRequest {
  accountId: string;
  contactIds?: string[];
  externalResearch?: ResearchSignal[];
}

export interface RunResearchResult {
  brief: ResearchBrief;
  readyForMatch: boolean;
}

/**
 * Runtime composition root for Research Agent v1.
 * HubSpot supplies CRM context; external evidence may be collected by an
 * explicitly injected provider. No default provider is silently selected.
 */
export function createHubSpotBackedResearchAgent(hubspot: HubSpotAdapter): ResearchAgent {
  const agent = createResearchAgent();

  return {
    async run(input) {
      return agent.run(input);
    },
  };
}

export async function runHubSpotResearch(
  hubspot: HubSpotAdapter,
  request: RunResearchRequest,
  externalResearchProvider?: ExternalResearchProvider,
): Promise<RunResearchResult> {
  const provider = createHubSpotCampaignContextProvider(hubspot);
  const context = await provider.load({
    accountId: request.accountId,
    contactIds: request.contactIds,
  });

  const selected = request.contactIds?.length
    ? context.contacts.filter((contact) => request.contactIds?.includes(contact.id))
    : context.contacts;

  const collectedResearch = externalResearchProvider
    ? await externalResearchProvider.search({
        accountId: context.account.id,
        companyName: context.account.name,
        domain: context.account.domain,
        contactNames: selected
          .map((contact) => [contact.firstName, contact.lastName].filter(Boolean).join(' '))
          .filter(Boolean),
        contactTitles: selected.map((contact) => contact.jobTitle).filter(Boolean),
      })
    : request.externalResearch ?? [];

  const agent = createResearchAgent();
  const brief = await agent.run({
    context,
    contactIds: request.contactIds,
    externalResearch: collectedResearch,
  });

  return {
    brief,
    readyForMatch: brief.blockers.length === 0 && brief.signals.some((signal) => signal.confidence !== 'low'),
  };
}
