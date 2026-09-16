import { describe, expect, it } from 'vitest';
import { buildResearchQueryPlan, runExternalResearchEngine } from './externalResearchEngine';
import type { ExternalResearchDocument, ExternalResearchProvider } from '../integrations/externalResearchProvider';

describe('external research engine', () => {
  it('keeps company identity separate from each provider search query', async () => {
    const calls: { companyName: string; searchQuery?: string }[] = [];
    const document: ExternalResearchDocument = {
      id: 'source-1',
      title: 'Example ASIC update',
      url: 'https://example.com/asic',
      sourceType: 'public-web',
    };

    const provider: ExternalResearchProvider = {
      async search(query) {
        calls.push({ companyName: query.companyName, searchQuery: query.searchQuery });
        return calls.length === 1 ? [document] : [];
      },
    };

    const query = {
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
      domain: 'example.com',
      contactNames: ['Jane Doe'],
      maxSignals: 12,
    };

    const result = await runExternalResearchEngine(provider, query);

    expect(result.documents).toHaveLength(1);
    expect(calls[0]).toEqual({
      companyName: 'Example Semiconductor',
      searchQuery: 'site:example.com Example Semiconductor technology engineering',
    });
    expect(calls.some((call) => call.companyName.includes('semiconductor ASIC SoC engineering'))).toBe(false);
  });

  it('builds deterministic research queries from account and persona context', () => {
    const plan = buildResearchQueryPlan({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
      domain: 'example.com',
      contactNames: ['Jane Doe', 'John Smith'],
    });

    expect(plan.queries).toEqual([
      'site:example.com Example Semiconductor technology engineering',
      'Example Semiconductor semiconductor ASIC SoC engineering',
      'Example Semiconductor design verification physical design DFT',
      'Example Semiconductor product technology engineering news',
      'Jane Doe Example Semiconductor engineering',
      'John Smith Example Semiconductor engineering',
    ]);
  });
});
