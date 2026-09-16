import type {
  ExternalResearchDocument,
  ExternalResearchProvider,
  ExternalResearchQuery,
} from './externalResearchProvider';

interface GoogleSearchResult {
  title?: string;
  displayUrl?: string;
  snippet?: string;
}

interface GoogleSearchResponse {
  searchResults?: GoogleSearchResult[];
}

export interface GoogleWebSearchClientOptions {
  apiKey: string;
  clientId: string;
  userIpAddress: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
  maxResultsPerQuery?: number;
  regionCode?: string;
}

/**
 * Adapter for Google's Web Search Service REST API.
 * The API requires an API key plus partner client ID and end-user IP context.
 * See: https://developers.google.com/web-search-service/reference/rest/v1/TopLevel/search
 */
export function createGoogleWebSearchProvider(
  options: GoogleWebSearchClientOptions,
): ExternalResearchProvider {
  const apiKey = options.apiKey.trim();
  const clientId = options.clientId.trim();
  const userIpAddress = options.userIpAddress.trim();
  const endpoint = options.endpoint?.trim() || 'https://websearchservice.googleapis.com/v1:search';
  const fetchImpl = options.fetchImpl ?? fetch;
  const maxResults = Math.max(1, Math.min(options.maxResultsPerQuery ?? 6, 20));

  if (!apiKey) throw new Error('Google Web Search API key is required.');
  if (!clientId) throw new Error('Google Web Search client ID is required.');
  if (!userIpAddress) throw new Error('Google Web Search user IP address is required.');
  if (!isHttpUrl(endpoint)) throw new Error('Google Web Search endpoint must be a valid HTTP(S) URL.');

  return {
    async search(query: ExternalResearchQuery): Promise<ExternalResearchDocument[]> {
      const searchExpression = buildSearchQuery(query);
      const url = new URL(endpoint);
      url.searchParams.set('searchQuery.query', searchExpression);
      url.searchParams.set('clientContext.clientId', clientId);
      url.searchParams.set('userContext.ipAddress', userIpAddress);
      if (options.regionCode?.trim()) {
        url.searchParams.set('userContext.regionCode', options.regionCode.trim());
      }
      url.searchParams.set('pageSize', String(maxResults));

      const response = await fetchImpl(url.toString(), {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-goog-api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Google Web Search returned HTTP ${response.status}.`);
      }

      const payload = (await response.json()) as GoogleSearchResponse;
      if (!Array.isArray(payload.searchResults)) {
        throw new Error('Google Web Search returned an invalid searchResults payload.');
      }

      return payload.searchResults
        .filter((result) => typeof result.displayUrl === 'string' && isHttpUrl(result.displayUrl))
        .map((result, index) => ({
          id: `${query.accountId}-google-${index + 1}`,
          title: result.title?.trim() || 'Google Search result',
          url: result.displayUrl!.trim(),
          excerpt: result.snippet?.trim() || undefined,
          sourceType: 'other' as const,
          confidence: 'medium' as const,
          observedAt: new Date().toISOString(),
        }));
    },
  };
}

function buildSearchQuery(query: ExternalResearchQuery): string {
  const parts = [query.companyName.trim()];
  if (query.domain?.trim()) parts.push(`site:${query.domain.trim()}`);
  if (query.contactNames?.length) parts.push(query.contactNames.slice(0, 3).join(' '));
  if (query.contactTitles?.length) parts.push(query.contactTitles.slice(0, 2).join(' '));
  return parts.filter(Boolean).join(' ');
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function createConfiguredGoogleWebSearchProviderFromEnv(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  const apiKey = env.AIONSI_GOOGLE_WSS_API_KEY?.trim();
  const clientId = env.AIONSI_GOOGLE_WSS_CLIENT_ID?.trim();
  const userIpAddress = env.AIONSI_GOOGLE_WSS_USER_IP?.trim();

  if (!apiKey || !clientId || !userIpAddress) return undefined;

  return createGoogleWebSearchProvider({
    apiKey,
    clientId,
    userIpAddress,
    regionCode: env.AIONSI_GOOGLE_WSS_REGION_CODE,
  });
}
