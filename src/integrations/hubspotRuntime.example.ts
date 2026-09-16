import { createHubSpotApiAdapter, createHubSpotFetchTransport } from './hubspotRuntime';
import { createHubSpotCampaignContextProvider } from './crmCampaignContext';

/**
 * Example host wiring only. Keep HUBSPOT_ACCESS_TOKEN in the deployment/runtime
 * secret store; never commit a real token to the repository.
 */
export function createHubSpotContextProviderFromEnvironment() {
  const accessToken = import.meta.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('HUBSPOT_ACCESS_TOKEN is not configured.');
  }

  const transport = createHubSpotFetchTransport({ accessToken });
  const adapter = createHubSpotApiAdapter(transport);
  return createHubSpotCampaignContextProvider(adapter);
}
