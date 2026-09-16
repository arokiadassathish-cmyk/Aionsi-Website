import { createApolloHttpTransport } from './apolloHttpTransport';

describe('createApolloHttpTransport', () => {
  it('maps enrollment to Apollo add-contact endpoint and auth', async () => {
    const calls: Array<{ url: string; body?: string; headers?: HeadersInit }> = [];
    const fetchImpl = async (url: string, init?: RequestInit) => {
      calls.push({ url, body: init?.body?.toString(), headers: init?.headers });
      return new Response('{}', { status: 200 });
    };

    const transport = createApolloHttpTransport({ apiKey: 'test-key', fetchImpl });
    await transport.enroll({ sequenceId: 'seq-1', contactIds: ['c-1'], emailAccountId: 'mail-1' });

    expect(calls[0].url).toContain('/emailer_campaigns/seq-1/add_contact_ids');
    expect(calls[0].body).toContain('mail-1');
    expect(calls[0].body).toContain('c-1');
    expect((calls[0].headers as Record<string, string>)['x-api-key']).toBe('test-key');
  });

  it('maps activation to Apollo approve endpoint and auth', async () => {
    const calls: Array<{ url: string; headers?: HeadersInit }> = [];
    const fetchImpl = async (url: string, init?: RequestInit) => {
      calls.push({ url, headers: init?.headers });
      return new Response('{}', { status: 200 });
    };

    const transport = createApolloHttpTransport({ apiKey: 'test-key', fetchImpl });
    await transport.activate({ sequenceId: 'seq-1' });

    expect(calls[0].url).toContain('/emailer_campaigns/seq-1/approve');
    expect((calls[0].headers as Record<string, string>)['x-api-key']).toBe('test-key');
  });
});
