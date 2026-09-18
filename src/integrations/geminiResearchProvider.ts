import type {
  ExternalResearchDocument,
  ExternalResearchProvider,
  ExternalResearchQuery,
} from './externalResearchProvider';

interface GeminiGroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

interface GeminiGroundingSupport {
  segment?: {
    text?: string;
    startIndex?: number;
    endIndex?: number;
  };
  groundingChunkIndices?: number[];
}

interface GeminiCandidate {
  content?: {
    parts?: Array<{ text?: string }>;
  };
  groundingMetadata?: {
    groundingChunks?: GeminiGroundingChunk[];
    groundingSupports?: GeminiGroundingSupport[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
}

export interface GeminiResearchProviderOptions {
  apiKey: string;
  model?: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
  maxResultsPerQuery?: number;
}

/**
 * Gemini research adapter using Google's current Gemini API with the
 * google_search grounding tool. Search, synthesis and source attribution are
 * handled by Gemini; the adapter converts grounded source segments into the
 * stable AionSi research-provider contract.
 */
export function createGeminiResearchProvider(
  options: GeminiResearchProviderOptions,
): ExternalResearchProvider {
  const apiKey = options.apiKey.trim();
  const model = options.model?.trim() || 'gemini-2.5-pro';
  const endpoint = options.endpoint?.trim()
    || `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const fetchImpl = options.fetchImpl ?? fetch;
  const maxResults = Math.max(1, Math.min(options.maxResultsPerQuery ?? 12, 20));

  if (!apiKey) throw new Error('Gemini API key is required.');
  if (!isHttpUrl(endpoint)) throw new Error('Gemini research endpoint must be a valid HTTP(S) URL.');

  const search = async (query: ExternalResearchQuery): Promise<ExternalResearchDocument[]> => {
    const prompt = buildResearchPrompt(query);
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
    if (!response.ok) {
      throw new Error(
        payload.error?.message
          ? `Gemini research returned HTTP ${response.status}: ${payload.error.message}`
          : `Gemini research returned HTTP ${response.status}.`,
      );
    }

    const candidate = payload.candidates?.[0];
    if (!candidate) throw new Error('Gemini research returned no candidate response.');

    const chunks = candidate.groundingMetadata?.groundingChunks ?? [];
    const supports = candidate.groundingMetadata?.groundingSupports ?? [];
    const observedAt = new Date().toISOString();
    const documents: ExternalResearchDocument[] = [];
    const seen = new Set<string>();

    for (const support of supports) {
      const claim = support.segment?.text?.trim();
      if (!claim) continue;

      for (const chunkIndex of support.groundingChunkIndices ?? []) {
        const chunk = chunks[chunkIndex]?.web;
        const url = chunk?.uri?.trim();
        if (!url || !isHttpUrl(url)) continue;
        const key = url.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        documents.push({
          id: `${query.accountId}-gemini-${documents.length + 1}`,
          title: chunk?.title?.trim() || 'Google Search source',
          url,
          excerpt: claim,
          sourceType: classifySource(url, query.domain),
          observedAt,
          confidence: 'medium',
        });

        if (documents.length >= maxResults) return documents;
      }
    }

    // If Gemini returned grounded sources but no segment-level attribution,
    // retain the source URLs rather than inventing claims. The title is used
    // only as a source label by the downstream deterministic matcher.
    if (documents.length === 0) {
      for (const chunk of chunks) {
        const url = chunk.web?.uri?.trim();
        if (!url || !isHttpUrl(url)) continue;
        const key = url.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        documents.push({
          id: `${query.accountId}-gemini-${documents.length + 1}`,
          title: chunk.web?.title?.trim() || 'Google Search source',
          url,
          excerpt: chunk.web?.title?.trim() || 'Grounded Google Search source.',
          sourceType: classifySource(url, query.domain),
          observedAt,
          confidence: 'low',
        });
        if (documents.length >= maxResults) break;
      }
    }

    if (documents.length === 0) {
      throw new Error('Gemini research returned no grounded web sources.');
    }

    return documents;
  };

  return {
    search,
    async collect(query) {
      const documents = await search(query);
      return documents.map((document) => ({
        id: document.id,
        claim: document.excerpt?.trim() || document.title.trim(),
        sourceUrl: document.url,
        sourceType: document.sourceType,
        confidence: document.confidence,
        observedAt: document.observedAt,
      }));
    },
  };
}

function buildResearchPrompt(query: ExternalResearchQuery): string {
  const currentDate = new Date().toISOString().slice(0, 10);
  const contacts = query.contactNames?.length
    ? query.contactNames.slice(0, 3).join(', ')
    : 'No contact names supplied';
  const titles = query.contactTitles?.length
    ? query.contactTitles.slice(0, 3).join(', ')
    : 'No contact titles supplied';

  return [
    `You are the research layer for AionSi's semiconductor engineering outreach system. Today is ${currentDate}.`,
    `Research the company "${query.companyName}"${query.domain ? ` (domain: ${query.domain})` : ''} using Google Search grounding.`,
    `Relevant contact names: ${contacts}.`,
    `Relevant contact titles: ${titles}.`,
    query.geography ? `Geography: ${query.geography}.` : '',
    '',
    'Find current, verifiable engineering and business signals useful for a technical B2B outreach decision.',
    'Prioritize official company/careers/product sources, credible technical publications, and recent evidence.',
    'Look for semiconductor products/programs, verification/validation, SoC/IP, memory/storage, interfaces, physical design, DFT, engineering automation, hiring signals, facilities, partnerships, launches, or other concrete engineering activity.',
    'Do not infer an undisclosed project, customer relationship, purchase intent, or active requirement.',
    'Do not invent facts. Only make claims that are directly supported by the grounded web sources.',
    'Return concise factual statements; the application will attach source citations from Gemini grounding metadata.',
  ].filter(Boolean).join('\\n');
}

function classifySource(url: string, domain?: string): ExternalResearchDocument['sourceType'] {
  const lower = url.toLowerCase();
  if (domain && lower.includes(domain.toLowerCase().replace(/^www\\./, ''))) return 'company-site';
  if (lower.includes('linkedin.com')) return 'linkedin';
  if (/(news|reuters|bloomberg|techcrunch|businesswire|globenewswire|prnewswire)/.test(lower)) return 'news';
  return 'public-web';
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function createConfiguredGeminiResearchProviderFromEnv(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  const apiKey = env.GEMINI_API_KEY?.trim();
  if (!apiKey) return undefined;

  return createGeminiResearchProvider({
    apiKey,
    model: env.GEMINI_RESEARCH_MODEL,
  });
}
