import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { createHubSpotCampaignContextProvider } from '../integrations/crmCampaignContext';
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
 * HubSpot supplies CRM context; external evidence is injected by a trusted
 * research/search layer. No unsupported claims are generated here.
 */
export function createHubSpotBackedResearchAgent(hubspot: HubSpotAdapter): ResearchAgent {
  const provider = createHubSpotCampaignContextProvider(hubspot);
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
): Promise<RunResearchResult> {
  const provider = createHubSpotCampaignContextProvider(hubspot);
  const context = await provider.load({
    accountId: request.accountId,
    contactIds: request.contactIds,
  });

  const agent = createResearchAgent();
  const brief = await agent.run({
    context,
    contactIds: request.contactIds,
    externalResearch: request.externalResearch,
  });

  return {
    brief,
    readyForMatch: brief.blockers.length === 0 && brief.signals.some((signal) => signal.confidence !== 'low'),
  };
}
