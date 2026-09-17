import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import type { ExternalResearchProvider } from '../integrations/externalResearchProvider';
import { runDailyCampaign, type DailyCampaignRunResult, type DailyCampaignTarget } from './dailyCampaignRuntime';

export interface DryRunScenarioOptions {
  hubspot: HubSpotAdapter;
  researchProvider: ExternalResearchProvider;
  targets: DailyCampaignTarget[];
  maxTargets?: number;
}

/**
 * Executes a deterministic, side-effect-free campaign validation run.
 * The underlying daily runtime is forced into dry_run mode; no Apollo
 * execution callback is supplied by this helper.
 */
export async function runDailyDryRunScenario(
  options: DryRunScenarioOptions,
): Promise<DailyCampaignRunResult> {
  return runDailyCampaign(
    options.hubspot,
    options.researchProvider,
    options.targets,
    { maxTargetsPerRun: options.maxTargets ?? 25 },
    'dry_run',
  );
}
