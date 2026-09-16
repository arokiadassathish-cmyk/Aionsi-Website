import type { HubSpotCampaignContext, HubSpotAdapter } from './hubspotAdapter';

export interface CampaignContextRequest {
  accountId: string;
  contactIds?: string[];
}

export interface CampaignContextProvider {
  load(request: CampaignContextRequest): Promise<HubSpotCampaignContext>;
}

export function createHubSpotCampaignContextProvider(
  hubspot: HubSpotAdapter,
): CampaignContextProvider {
  return {
    load: ({ accountId, contactIds }) =>
      hubspot.getCampaignContext(accountId, contactIds),
  };
}
