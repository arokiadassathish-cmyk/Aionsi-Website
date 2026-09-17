import { targetAccounts, type TargetAccount } from './targetAccounts';
import type { DailyCampaignTarget } from '../agents/dailyCampaignRuntime';

export interface ConfiguredTargetAccountInput {
  accountId: string;
  name?: string;
  slug: string;
  domain?: string;
  contactIds?: string[];
  priority?: number;
}

export interface ConfiguredTargetAccount extends DailyCampaignTarget {
  targetPage: TargetAccount;
}

/**
 * The public Target Accounts page is the metadata source of truth. Runtime
 * configuration supplies only execution identity (HubSpot company ID,
 * contacts, domain and priority). This keeps prospecting scope aligned with
 * the public account registry without copying the company list into secrets.
 */
export function buildConfiguredTargetAccounts(
  configured: ConfiguredTargetAccountInput[],
): ConfiguredTargetAccount[] {
  const bySlug = new Map(targetAccounts.map((account) => [account.slug, account]));

  return configured.map((item) => {
    const targetPage = bySlug.get(item.slug);
    if (!targetPage) {
      throw new Error(`Configured target slug "${item.slug}" is not present in src/data/targetAccounts.ts.`);
    }

    if (!item.accountId.trim()) {
      throw new Error(`Configured target "${item.slug}" is missing a HubSpot accountId.`);
    }

    return {
      accountId: item.accountId,
      name: targetPage.name,
      slug: targetPage.slug,
      domain: item.domain,
      contactIds: item.contactIds,
      priority: item.priority,
      targetPage,
    };
  });
}

export function parseConfiguredTargetAccounts(raw: string | undefined): ConfiguredTargetAccount[] {
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('AIONSI_DAILY_TARGETS_JSON must contain valid JSON.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('AIONSI_DAILY_TARGETS_JSON must be a JSON array.');
  }

  return buildConfiguredTargetAccounts(parsed as ConfiguredTargetAccountInput[]);
}
