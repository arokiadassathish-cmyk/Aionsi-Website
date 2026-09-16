import { describe, expect, it } from 'vitest';
import { createGoogleWebSearchProvider } from './googleWebSearchProvider';

describe('Google Web Search provider', () => {
  it('sends the required Google WSS request parameters and maps results', async () => {
    let requestedUrl = '';
    let requestedApiKey = '';

    const provider = createGoogleWebSearchProvider({
      apiKey: 'test-key',
      clientId: 'partner-aionsi-test',
      userIpAddress: '192.0.2.10',
      regionCode: 'IN',
      fetchImpl: async (input, init) => {
        requestedUrl = String(input);
        requestedApiKey = new Headers(init?.headers).get('x-goog-api-key') ?? '';
        return new Response(JSON.stringify({
          searchResults: [{
            title: 'Example ASIC update',
            displayUrl: 'https://example.com/asic',
            snippet: 'Custom ASIC engineering update.',
          }],
          searchInfo: { totalResults: '1' },
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

    const params = new URL(requestedUrl).searchParams;
    expect(params.get('searchQuery.query')).toContain('Example Semiconductor');
    expect(params.get('searchQuery.query')).toContain('site:example.com');
    expect(params.get('clientContext.clientId')).toBe('partner-aionsi-test');
    expect(params.get('userContext.ipAddress')).toBe('192.0.2.10');
    expect(params.get('userContext.regionCode')).toBe('IN');
    expect(params.get('pageSize')).toBe('6');
    expect(requestedApiKey).toBe('test-key');
    expect(documents[0]).toMatchObject({
      id: 'acct-1-google-1',
      title: 'Example ASIC update',
      url: 'https://example.com/asic',
      sourceType: 'other',
      confidence: 'medium',
    });
  });

  it('fails closed on provider errors', async () => {
    const provider = createGoogleWebSearchProvider({
      apiKey: 'test-key',
      clientId: 'partner-aionsi-test',
      userIpAddress: '192.0.2.10',
      fetchImpl: async () => new Response('unauthorized', { status: 401 }),
    });

    await expect(provider.search({
      accountId: 'acct-1',
      companyName: 'Example Semiconductor',
    })).rejects.toThrow('HTTP 401');
  });

  it('requires all Google WSS credentials', () => {
    expect(() => createGoogleWebSearchProvider({
      apiKey: '',
      clientId: 'partner-aionsi-test',
      userIpAddress: '192.0.2.10',
    })).toThrow('API key is required');

    expect(() => createGoogleWebSearchProvider({
      apiKey: 'test-key',
      clientId: '',
      userIpAddress: '192.0.2.10',
    })).toThrow('client ID is required');

    expect(() => createGoogleWebSearchProvider({
      apiKey: 'test-key',
      clientId: 'partner-aionsi-test',
      userIpAddress: '',
    })).toThrow('user IP address is required');
  });
});
