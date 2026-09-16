import type { ExternalResearchProvider } from './externalResearchProvider';
import { createConfiguredLiveResearchProviderFromEnv } from './liveResearchSearchProvider';
import { createConfiguredGoogleWebSearchProviderFromEnv } from './googleWebSearchProvider';

/**
 * Runtime composition boundary for live research.
 * Prefer an explicitly configured generic provider; otherwise use the
 * configured Google Web Search Service adapter. Returns undefined when no
 * provider credentials are present so dry-runs remain deterministic.
 */
export function resolveLiveResearchProvider(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  return createConfiguredLiveResearchProviderFromEnv(env)
    ?? createConfiguredGoogleWebSearchProviderFromEnv(env);
}
