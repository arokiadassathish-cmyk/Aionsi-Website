import { describe, expect, it } from 'vitest';
import { documentsToResearchSignals, createStaticExternalResearchProvider } from './externalResearchProvider';

describe('external research provider', () => {
  it('rejects invalid URLs and duplicate sources', () => {
    const signals = documentsToResearchSignals([
      { url: 'not-a-url', text: 'A sufficiently long engineering statement that should be ignored.' },
      { url: 'https://example.com/a', sourceType: 'company-site', text: 'The company develops custom ASIC products for data center workloads.' },
      { url: 'https://example.com/a', sourceType: 'company-site', text: 'The company develops custom ASIC products for data center workloads.' },
    ]);
    expect(signals).toHaveLength(1);
    expect(signals[0].sourceUrl).toBe('https://example.com/a');
    expect(signals[0].confidence).toBe('high');
  });

  it('caps signals deterministically', () => {
    const documents = Array.from({ length: 20 }, (_, index) => ({
      url: `https://example.com/${index}`,
      text: `Company engineering signal number ${index} describes semiconductor design verification and SoC development work.`,
    }));
    expect(documentsToResearchSignals(documents, 3)).toHaveLength(3);
  });

  it('supports deterministic static provider filtering', async () => {
    const provider = createStaticExternalResearchProvider([
      { url: 'https://example.com/a', text: 'Oppstar develops semiconductor engineering solutions.' },
      { url: 'https://example.com/b', text: 'Another company develops unrelated software.' },
    ]);
    const results = await provider.search({ accountId: '1', companyName: 'Oppstar' });
    expect(results).toHaveLength(1);
  });
});
