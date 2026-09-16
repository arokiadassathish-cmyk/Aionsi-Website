import { describe, expect, it } from 'vitest';
import { runDailyCampaign } from './dailyCampaignRuntime';
import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import type { ExternalResearchProvider } from './researchMatchRuntime';

const hubspot: HubSpotAdapter = {
  async getCompany(id) { return { id, name: id === 'existing' ? 'SkyeChip' : 'NetNew Semiconductor', domain: 'example.com', properties: {} }; },
  async getContactsForCompany() { return []; },
  async getContact(id) { return { id, email: `${id}@example.com`, firstName: 'Test', lastName: 'Contact', jobTitle: 'VP Engineering', properties: {} }; },
  async getCampaignContext(id) { return { account: await this.getCompany(id), contacts: [] }; },
  async updateContact() {},
  async updateCompany() {},
};

const provider: ExternalResearchProvider = {
  async collect({ companyName }) {
    return [{ id: 'signal-1', claim: `${companyName} is developing an ASIC platform`, sourceUrl: 'https://example.com/technology', sourceType: 'company-site', confidence: 'high' }];
  },
};

describe('runDailyCampaign', () => {
  it('blocks existing customers before research', async () => {
    let researched = false;
    const guardedProvider: ExternalResearchProvider = { collect: async () => { researched = true; return []; } };
    const result = await runDailyCampaign(hubspot, guardedProvider, [{ accountId: 'existing', name: 'SkyeChip', slug: 'skyechip' }]);
    expect(result.summary.blocked).toBe(1);
    expect(researched).toBe(false);
    expect(result.items[0]?.status).toBe('blocked');
  });

  it('queues eligible targets for approval in dry-run mode', async () => {
    const result = await runDailyCampaign(hubspot, provider, [{ accountId: 'new', name: 'NetNew Semiconductor', slug: 'netnew-semiconductor' }]);
    expect(result.summary.readyForApproval).toBe(1);
    expect(result.items[0]?.status).toBe('ready_for_approval');
    expect(result.items[0]?.match).toBeDefined();
  });

  it('does not execute in dry-run mode even when an executor is supplied', async () => {
    let executed = false;
    const result = await runDailyCampaign(
      hubspot,
      provider,
      [{ accountId: 'new', name: 'NetNew Semiconductor', slug: 'netnew-semiconductor' }],
      { executeApproved: async () => { executed = true; } },
      'dry_run',
    );
    expect(executed).toBe(false);
    expect(result.summary.executed).toBe(0);
  });
});
