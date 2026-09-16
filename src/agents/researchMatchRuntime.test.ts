import { runResearchMatchRuntime, type ExternalResearchProvider } from './researchMatchRuntime';
import type { HubSpotAdapter, HubSpotCampaignContext } from '../integrations/hubspotAdapter';

const context: HubSpotCampaignContext = {
  account: {
    id: 'company-1',
    name: 'Example Semiconductor',
    domain: 'example.com',
    country: 'Malaysia',
    properties: {},
  },
  contacts: [
    {
      id: 'contact-1',
      firstName: 'Asha',
      lastName: 'Rao',
      jobTitle: 'VP Engineering',
      properties: {},
    },
  ],
};

const hubspot = {
  getCampaignContext: async () => context,
  getCompany: async () => context.account,
  getContactsForCompany: async () => context.contacts,
  getContact: async () => context.contacts[0],
  updateContact: async () => undefined,
  updateCompany: async () => undefined,
} satisfies HubSpotAdapter;

const provider: ExternalResearchProvider = {
  collect: async () => [
    {
      id: 'signal-1',
      claim: 'Example Semiconductor is developing an advanced ASIC with PCIe connectivity.',
      sourceUrl: 'https://example.com/engineering',
      sourceType: 'company-site',
      confidence: 'high',
    },
  ],
};

describe('Research -> Match runtime', () => {
  it('runs CRM context through sourced research and deterministic matching', async () => {
    const result = await runResearchMatchRuntime(hubspot, provider, {
      accountId: 'company-1',
      contactIds: ['contact-1'],
      targetSlug: 'example-semiconductor',
    });

    expect(result.eligible).toBe(true);
    expect(result.research?.companyName).toBe('Example Semiconductor');
    expect(result.research?.signals.some((signal) => signal.id === 'signal-1')).toBe(true);
    expect(result.match?.matches.length).toBeGreaterThan(0);
  });

  it('blocks an existing customer before external research collection', async () => {
    let collected = false;
    const blockedProvider: ExternalResearchProvider = {
      collect: async () => {
        collected = true;
        return [];
      },
    };

    const result = await runResearchMatchRuntime(hubspot, blockedProvider, {
      accountId: 'company-1',
      targetSlug: 'skyechip',
    });

    expect(result.eligible).toBe(false);
    expect(result.blockers[0]).toContain('existing AionSi customer');
    expect(collected).toBe(false);
  });
});
