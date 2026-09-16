import type {
  ApolloExecutionTransport,
  ApolloEnrollmentRequest,
  ApolloActivationRequest,
} from './apolloExecutionAdapter';

export interface ApolloHttpTransportOptions {
  apiKey: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
}

const DEFAULT_ENDPOINT = 'https://api.apollo.io/api/v1';

export function createApolloHttpTransport(options: ApolloHttpTransportOptions): ApolloExecutionTransport {
  if (!options.apiKey.trim()) throw new Error('Apollo API key is required.');
  const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
  const fetchImpl = options.fetchImpl ?? fetch;

  return {
    async enroll(request: Omit<ApolloEnrollmentRequest, 'mode'>) {
      const response = await fetchImpl(`${endpoint}/emailer_campaigns/${request.sequenceId}/add_contact_ids`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': options.apiKey,
        },
        body: JSON.stringify({
          emailer_campaign_id: request.sequenceId,
          contact_ids: request.contactIds,
          send_email_from_email_account_id: request.emailAccountId,
          sequence_unverified_email: false,
          sequence_no_email: false,
          status: 'active',
        }),
      });
      if (!response.ok) throw new Error(`Apollo enrollment failed (${response.status}).`);
    },

    async activate(request: Omit<ApolloActivationRequest, 'mode'>) {
      const response = await fetchImpl(`${endpoint}/emailer_campaigns/${request.sequenceId}/approve`, {
        method: 'POST',
        headers: { accept: 'application/json', 'x-api-key': options.apiKey },
      });
      if (!response.ok) throw new Error(`Apollo activation failed (${response.status}).`);
    },
  };
}

export function createConfiguredApolloHttpTransportFromEnv(
  env: Record<string, string | undefined> = process.env,
): ApolloExecutionTransport | undefined {
  const apiKey = env.APOLLO_API_KEY;
  if (!apiKey) return undefined;
  return createApolloHttpTransport({
    apiKey,
    endpoint: env.APOLLO_API_BASE_URL,
  });
}
