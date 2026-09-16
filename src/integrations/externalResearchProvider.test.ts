import { describe, expect, it } from 'vitest';
import { createStaticExternalResearchProvider } from './externalResearchProvider';

describe('external research provider', () => {
  it('normalizes sourced documents into research signals', async () => {
    const provider = createStaticExternalResearchProvider([
      {
        id: 'signal-1',
        title: 'Custom ASIC program',
        url: 'https://example.com/asic',
        excerpt: 'The company is expanding custom ASIC development.',
        sourceType: 'company-site',
        confidence: 'high',
      },
    ]);

    const signals = await provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
    });

    expect(signals).toHaveLength(1);
    expect(signals[0]).toMatchObject({
      id: 'signal-1',
      sourceUrl: 'https://example.com/asic',
      sourceType: 'company-site',
      confidence: 'high',
    });
    expect(signals[0].claim).toContain('expanding custom ASIC development');
  });

  it('rejects invalid URLs and duplicate sources without inventing signals', async () => {
    const provider = createStaticExternalResearchProvider([
      {
        id: 'valid',
        title: 'Valid source',
        url: 'https://example.com/source',
        sourceType: 'public-web',
      },
      {
        id: 'duplicate',
        title: 'Duplicate source',
        url: 'https://example.com/source',
        sourceType: 'public-web',
      },
      {
        id: 'invalid',
        title: 'Invalid source',
        url: 'not-a-url',
        sourceType: 'public-web',
      },
    ]);

    const signals = await provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
    });

    expect(signals).toHaveLength(1);
    expect(signals[0].id).toBe('valid');
  });

  it('caps the number of collected signals', async () => {
    const provider = createStaticExternalResearchProvider(
      Array.from({ length: 15 }, (_, index) => ({
        id: `signal-${index + 1}`,
        title: `Source ${index + 1}`,
        url: `https://example.com/source-${index + 1}`,
        sourceType: 'public-web' as const,
      })),
      5,
    );

    const signals = await provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
    });

    expect(signals).toHaveLength(5);
  });
});
