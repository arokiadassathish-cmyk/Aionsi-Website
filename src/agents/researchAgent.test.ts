import { createResearchAgent } from './researchAgent';
import type { HubSpotCampaignContext } from '../integrations/hubspotAdapter';

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

describe('Research Agent', () => {
  it('preserves CRM identity and selected contacts', async () => {
    const brief = await createResearchAgent().run({
      context,
      contactIds: ['contact-1'],
    });

    expect(brief.companyName).toBe('Example Semiconductor');
    expect(brief.decisionMakers).toHaveLength(1);
    expect(brief.decisionMakers[0].contactId).toBe('contact-1');
    expect(brief.crmContextUsed).toBe(true);
  });

  it('does not fabricate external evidence', async () => {
    const brief = await createResearchAgent().run({ context });

    expect(brief.engineeringThemes).toEqual([]);
    expect(brief.decisionMakers[0].signals).toEqual([]);
    expect(brief.signals.some((signal) => signal.sourceType === 'public-web')).toBe(false);
  });

  it('accepts explicitly injected external evidence', async () => {
    const brief = await createResearchAgent().run({
      context,
      externalResearch: [
        {
          id: 'signal-1',
          claim: 'Example Semiconductor announced a new SoC program.',
          sourceUrl: 'https://example.com/news',
          sourceType: 'company-site',
          confidence: 'high',
        },
      ],
    });

    expect(brief.signals.some((signal) => signal.id === 'signal-1')).toBe(true);
  });
});
