import type {
  ExternalResearchDocument,
  ExternalResearchProvider,
  ExternalResearchQuery,
} from './externalResearchProvider';

export interface LiveSearchResult {
  title?: string;
  url?: string;
  snippet?: string;
  content?: string;
}

export interface LiveSearchResponse {
  results?: LiveSearchResult[];
}

export interface LiveSearchClientOptions {
  endpoint: string;
  apiKey: string;
  fetchImpl?: typeof fetch;
  maxResultsPerQuery?: number;
}

/**
 * Generic live-search adapter. The search service is deliberately injected so
 * credentials and vendor-specific transport remain outside the agent layer.
 */
export function createLiveResearchSearchProvider(
  options: LiveSearchClientOptions,
): ExternalResearchProvider {
  const endpoint = options.endpoint.trim();
  const apiKey = options.apiKey.trim();
  const fetchImpl = options.fetchImpl ?? fetch;
  const maxResults = Math.max(1, Math.min(options.maxResultsPerQuery ?? 6, 12));

  if (!endpoint) throw new Error('Live research search endpoint is required.');
  if (!apiKey) throw new Error('Live research search API key is required.');

  return {
    async search(query: ExternalResearchQuery): Promise<ExternalResearchDocument[]> {
      const searchQuery = buildSearchQuery(query);
      const url = new URL(endpoint);
      url.searchParams.set('q', searchQuery);
      url.searchParams.set('limit', String(maxResults));

      const response = await fetchImpl(url.toString(), {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Live research search returned HTTP ${response.status}.`);
      }

      const payload = (await response.json()) as LiveSearchResponse;
      if (!Array.isArray(payload.results)) {
        throw new Error('Live research search returned an invalid results payload.');
      }

      return payload.results
        .filter((result) => typeof result.url === 'string' && isHttpUrl(result.url))
        .map((result, index) => ({
          id: `${query.accountId}-live-${index + 1}`,
          title: result.title?.trim() || 'External research source',
          url: result.url!.trim(),
          excerpt: (result.content ?? result.snippet ?? '').trim() || undefined,
          sourceType: 'other' as const,
          confidence: 'medium' as const,
          observedAt: new Date().toISOString(),
        }));
    },
  };
}

function buildSearchQuery(query: ExternalResearchQuery): string {
  const parts = [query.companyName.trim()];
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

export function createConfiguredLiveResearchProviderFromEnv(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  const endpoint = env.AIONSI_RESEARCH_SEARCH_ENDPOINT?.trim();
  const apiKey = env.AIONSI_RESEARCH_SEARCH_API_KEY?.trim();

  if (!endpoint || !apiKey) return undefined;

  return createLiveResearchSearchProvider({ endpoint, apiKey });
}
