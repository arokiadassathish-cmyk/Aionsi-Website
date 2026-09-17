import { describe, expect, it } from 'vitest';
import { runDailyDryRunScenario } from './dryRunScenario';
import type { DailyCampaignTarget } from './dailyCampaignRuntime';
import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import type { ExternalResearchProvider } from '../integrations/externalResearchProvider';

const hubspot = {
  getCompany: async () => ({ id: 'company-1', name: 'Example Semiconductor', domain: 'example.com' }),
  getContactsForCompany: async () => [],
} as unknown as HubSpotAdapter;

const researchProvider = {
  search: async () => [
    {
      id: 'doc-1',
      title: 'Example engineering update',
      url: 'https://example.com/engineering',
      excerpt: 'Verification engineering update',
      sourceType: 'other' as const,
      confidence: 'high' as const,
    },
  ],
} as unknown as ExternalResearchProvider;

const target = (index: number): DailyCampaignTarget => ({
  accountId: `account-${index}`,
  contactIds: [],
  slug: `example-${index}`,
  name: `Example Semiconductor ${index}`,
});

describe('runDailyDryRunScenario', () => {
  it('caps the dry run at 25 targets', async () => {
    const targets = Array.from({ length: 30 }, (_, index) => target(index + 1));
    const result = await runDailyDryRunScenario({ hubspot, researchProvider, targets });

    expect(result.mode).toBe('dry_run');
    expect(result.summary.targets).toBe(25);
    expect(result.items).toHaveLength(25);
  });
});
