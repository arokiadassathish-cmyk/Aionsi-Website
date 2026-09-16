import { createApolloHttpTransport } from './apolloHttpTransport';

describe('createApolloHttpTransport', () => {
  it('maps enrollment to Apollo add-contact endpoint', async () => {
    const calls: Array<{ url: string; body?: string }> = [];
    const fetchImpl = async (url: string, init?: RequestInit) => {
      calls.push({ url, body: init?.body?.toString() });
      return new Response('{}', { status: 200 });
    };

    const transport = createApolloHttpTransport({ apiKey: 'test-key', fetchImpl });
    await transport.enroll({ sequenceId: 'seq-1', contactIds: ['c-1'], emailAccountId: 'mail-1' });

    expect(calls[0].url).toContain('/emailer_campaigns/seq-1/add_contact_ids');
    expect(calls[0].body).toContain('mail-1');
    expect(calls[0].body).toContain('c-1');
  });

  it('maps activation to Apollo approve endpoint', async () => {
    const calls: string[] = [];
    const fetchImpl = async (url: string) => {
      calls.push(url);
      return new Response('{}', { status: 200 });
    };

    const transport = createApolloHttpTransport({ apiKey: 'test-key', fetchImpl });
    await transport.activate({ sequenceId: 'seq-1' });

    expect(calls[0]).toContain('/emailer_campaigns/seq-1/approve');
  });
});
