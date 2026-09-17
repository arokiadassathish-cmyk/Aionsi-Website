import { evaluateExecutionReadiness } from '../integrations/executionReadinessGuard';
import type { DailyCampaignItem } from './dailyCampaignRuntime';

export interface DailyExecutionConfiguration {
  mode: 'dry_run' | 'live';
  approvedAccountIds?: string[];
  executionEnabled?: boolean;
  requiredEnvironmentVariables: Record<string, string | undefined>;
  transportConfigured?: boolean;
}

/** Evaluates whether a prepared daily item may cross into live execution. */
export function evaluateDailyItemExecutionReadiness(
  item: DailyCampaignItem,
  configuration: DailyExecutionConfiguration,
) {
  const approved = configuration.approvedAccountIds?.includes(item.accountId) ?? false;

  return evaluateExecutionReadiness({
    mode: configuration.mode,
    approved,
    executionEnabled: configuration.executionEnabled ?? false,
    requiredEnvironmentVariables: configuration.requiredEnvironmentVariables,
    transport: configuration.transportConfigured
      ? {
          enroll: async () => undefined,
          activate: async () => undefined,
        }
      : undefined,
    checks: [
      {
        name: 'Campaign item is ready for execution',
        passed: item.status === 'ready_for_approval' || item.status === 'approved',
        blocker: 'Campaign item is not in an executable approval state.',
      },
      {
        name: 'Campaign item has no blockers',
        passed: item.blockers.length === 0,
        blocker: 'Campaign item contains unresolved blockers.',
      },
    ],
  });
}
