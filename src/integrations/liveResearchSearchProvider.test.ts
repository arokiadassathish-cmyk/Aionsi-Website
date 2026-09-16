import { describe, expect, it } from 'vitest';
import { createLiveResearchSearchProvider } from './liveResearchSearchProvider';

describe('live research search provider', () => {
  it('keeps company identity separate from the generated search request', async () => {
    let requestedUrl = '';

    const provider = createLiveResearchSearchProvider({
      endpoint: 'https://search.example.test/search',
      apiKey: 'test-key',
      fetchImpl: async (input) => {
        requestedUrl = String(input);
        return new Response(JSON.stringify({
          results: [{
            title: 'Example ASIC program',
            url: 'https://example.com/asic',
            snippet: 'Custom ASIC engineering activity.',
          }],
        }), { status: 200, headers: { 'content-type': 'application/json' } });
      },
    });

    const documents = await provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
      contactNames: ['Jane Doe'],
      contactTitles: ['VP Engineering'],
    });

    expect(new URL(requestedUrl).searchParams.get('q')).toContain('Example Semiconductor');
    expect(new URL(requestedUrl).searchParams.get('q')).not.toBe('site:example.com Example Semiconductor');
    expect(documents[0]).toMatchObject({
      url: 'https://example.com/asic',
      sourceType: 'other',
    });
  });

  it('fails closed on missing credentials', () => {
    expect(() => createLiveResearchSearchProvider({
      endpoint: 'https://search.example.test/search',
      apiKey: '',
    })).toThrow('API key is required');
  });
});
