import { describe, expect, it, vi } from 'vitest';
import { createDailyCampaignResearchProvider } from './dailyCampaignResearchProvider';
import type { ExternalResearchProvider } from './externalResearchProvider';

describe('createDailyCampaignResearchProvider', () => {
  it('preserves account identity and contact ids in the canonical query', async () => {
    const search = vi.fn().mockResolvedValue([
      {
        id: 'doc-1',
        title: 'Engineering update',
        url: 'https://example.com/update',
        excerpt: 'Example engineering signal',
        sourceType: 'other',
        confidence: 'high',
      },
    ]);

    const provider = createDailyCampaignResearchProvider({ search } satisfies ExternalResearchProvider);
    const signals = await provider.collect({
      companyName: 'Example Semiconductor',
      domain: 'example.com',
      geography: 'Bengaluru, India',
      contactIds: ['contact-123'],
    });

    expect(search).toHaveBeenCalledWith({
      accountId: 'Example Semiconductor',
      companyName: 'Example Semiconductor',
      domain: 'example.com',
      contactIds: ['contact-123'],
      geography: 'Bengaluru, India',
      maxSignals: 12,
    });
    expect(signals[0]).toMatchObject({
      id: 'doc-1',
      claim: 'Example engineering signal',
      sourceUrl: 'https://example.com/update',
      confidence: 'high',
    });
  });
});
