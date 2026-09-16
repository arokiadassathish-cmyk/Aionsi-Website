import { isExistingCustomer } from './existingCustomers';

export interface TargetAccountCandidate {
  slug: string;
  name: string;
}

export interface TargetAccountEligibility {
  eligible: boolean;
  blockers: string[];
}

/**
 * Net-new outbound gate. Existing customers are excluded before research,
 * matching, landing-page generation, or Apollo enrollment.
 */
export const evaluateOutboundTarget = (
  account: TargetAccountCandidate,
): TargetAccountEligibility => {
  if (isExistingCustomer(account.slug)) {
    return {
      eligible: false,
      blockers: [`${account.name} is an existing AionSi customer and is excluded from net-new outbound.`],
    };
  }

  return { eligible: true, blockers: [] };
};
