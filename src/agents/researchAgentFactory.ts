import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { createHubSpotCampaignContextProvider } from '../integrations/crmCampaignContext';
import {
  createExternalResearchProvider,
  documentsToResearchSignals,
  type ExternalResearchProvider,
} from '../integrations/externalResearchProvider';
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

export function createHubSpotBackedResearchAgent(hubspot: HubSpotAdapter): ResearchAgent {
  return createResearchAgent();
}

export async function runHubSpotResearch(
  hubspot: HubSpotAdapter,
  request: RunResearchRequest,
  externalResearchProvider?: ExternalResearchProvider,
): Promise<RunResearchResult> {
  const contextProvider = createHubSpotCampaignContextProvider(hubspot);
  const context = await contextProvider.load({
    accountId: request.accountId,
    contactIds: request.contactIds,
  });

  const selected = request.contactIds?.length
    ? context.contacts.filter((contact) => request.contactIds?.includes(contact.id))
    : context.contacts;

  const collectedResearch = externalResearchProvider
    ? documentsToResearchSignals(await externalResearchProvider.search({
        accountId: context.account.id,
        companyName: context.account.name,
        domain: context.account.domain,
        contactNames: selected
          .map((contact) => [contact.firstName, contact.lastName].filter(Boolean).join(' '))
          .filter(Boolean),
        contactTitles: selected.map((contact) => contact.jobTitle).filter(Boolean),
        maxSignals: 12,
      }))
    : request.externalResearch ?? [];

  const brief = await createResearchAgent().run({
    context,
    contactIds: request.contactIds,
    externalResearch: collectedResearch,
  });

  return {
    brief,
    readyForMatch: brief.blockers.length === 0 && brief.signals.some((signal) => signal.confidence !== 'low'),
  };
}

/**
 * Adapter helper for callers that want to supply a custom document search
 * function while retaining the canonical provider contract.
 */
export function createConfiguredResearchProvider(
  search: Parameters<typeof createExternalResearchProvider>[0]['search'],
  maxSignals = 12,
): ExternalResearchProvider {
  return createExternalResearchProvider({ search, maxSignals });
}
