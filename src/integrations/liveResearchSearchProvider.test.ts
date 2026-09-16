import { describe, expect, it } from 'vitest';
import { createLiveResearchSearchProvider } from './liveResearchSearchProvider';

describe('live research search provider', () => {
  it('preserves company identity while building a search request', async () => {
    let requestedUrl = '';
    const provider = createLiveResearchSearchProvider({
      endpoint: 'https://search.example.com/search',
      apiKey: 'test-key',
      fetchImpl: async (input) => {
        requestedUrl = String(input);
        return new Response(JSON.stringify({
          results: [{
            title: 'Example ASIC update',
            url: 'https://example.com/asic',
            snippet: 'Custom ASIC engineering update.',
            publishedDate: '2026-09-16T00:00:00Z',
          }],
        }), { status: 200, headers: { 'content-type': 'application/json' } });
      },
    });

    const documents = await provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
      domain: 'example.com',
      contactNames: ['Jane Doe'],
      contactTitles: ['VP Engineering'],
    });

    expect(new URL(requestedUrl).searchParams.get('q')).toContain('Example Semiconductor');
    expect(new URL(requestedUrl).searchParams.get('q')).toContain('site:example.com');
    expect(documents[0]).toMatchObject({
      id: 'acct-1-live-1',
      title: 'Example ASIC update',
      url: 'https://example.com/asic',
      sourceType: 'other',
    });
  });

  it('fails closed on provider errors', async () => {
    const provider = createLiveResearchSearchProvider({
      endpoint: 'https://search.example.com/search',
      apiKey: 'test-key',
      fetchImpl: async () => new Response('unauthorized', { status: 401 }),
    });

    await expect(provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
    })).rejects.toThrow('HTTP 401');
  });

  it('fails closed when credentials are missing', () => {
    expect(() => createLiveResearchSearchProvider({
      endpoint: 'https://search.example.com/search',
      apiKey: '',
    })).toThrow('API key is required');
  });
});
