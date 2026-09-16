import type { HubSpotCampaignContext } from './hubspotAdapter';

export interface HubSpotReadiness {
  ready: boolean;
  blockers: string[];
}

/**
 * Guards the research/orchestration layer from treating incomplete CRM data as fact.
 * Missing fields remain explicit and are surfaced as blockers rather than inferred.
 */
export function evaluateHubSpotReadiness(
  context: HubSpotCampaignContext,
  requiredContactIds: string[] = [],
): HubSpotReadiness {
  const blockers: string[] = [];

  if (!context.account.id || !context.account.name) {
    blockers.push('Account identity is incomplete.');
  }

  if (requiredContactIds.some((id) => !context.contacts.some((contact) => contact.id === id))) {
    blockers.push('One or more requested contacts are missing from HubSpot.');
  }

  if (context.contacts.length === 0) {
    blockers.push('No HubSpot contacts are associated with the account.');
  }

  return { ready: blockers.length === 0, blockers };
}
