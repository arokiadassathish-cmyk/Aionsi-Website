import type { ExternalResearchProvider } from './externalResearchProvider';
import { createConfiguredLiveResearchProviderFromEnv } from './liveResearchSearchProvider';

/**
 * Runtime composition boundary for live research.
 * Returns undefined when credentials are not configured so dry-runs remain
 * deterministic and fail closed rather than silently using another service.
 */
export function resolveLiveResearchProvider(
  env: Record<string, string | undefined> = process.env,
): ExternalResearchProvider | undefined {
  return createConfiguredLiveResearchProviderFromEnv(env);
}
