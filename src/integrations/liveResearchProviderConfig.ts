import type { ExternalResearchProvider } from './externalResearchProvider';
import { createConfiguredGeminiResearchProviderFromEnv } from './geminiResearchProvider';
import { createConfiguredLiveResearchProviderFromEnv } from './liveResearchSearchProvider';
import { createConfiguredGoogleWebSearchProviderFromEnv } from './googleWebSearchProvider';

/**
 * Runtime composition boundary for live research.
 * Prefer Gemini + Google Search grounding when GEMINI_API_KEY is configured;
 * retain the generic and legacy Google Web Search adapters as fallbacks.
 */
export function resolveLiveResearchProvider(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  return createConfiguredGeminiResearchProviderFromEnv(env)
    ?? createConfiguredLiveResearchProviderFromEnv(env)
    ?? createConfiguredGoogleWebSearchProviderFromEnv(env);
}
