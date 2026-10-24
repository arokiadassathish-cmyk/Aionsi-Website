import type { ApolloExecutionTransport } from './apolloExecutionAdapter';
import { evaluateProductionReadiness, type ProductionReadinessResult } from './productionReadiness';

export interface ExecutionReadinessInput {
  mode: 'dry_run' | 'live';
  approved: boolean;
  executionEnabled: boolean;
  requiredEnvironmentVariables: Record<string, string | undefined>;
  transport?: ApolloExecutionTransport;
  checks?: Array<{ name: string; passed: boolean; blocker?: string }>;
}

/**
 * Fail-closed guard for the final live execution boundary.
 * Dry-runs remain available without production credentials or approval.
 */
export function evaluateExecutionReadiness(
  input: ExecutionReadinessInput,
): ProductionReadinessResult {
  if (input.mode === 'dry_run') {
    return { ready: true, blockers: [], passed: ['Dry-run mode'] };
  }

  const checks = [
    ...(input.checks ?? []),
    {
      name: 'Human approval present',
      passed: input.approved,
      blocker: 'Live execution requires explicit human approval.',
    },
    {
      name: 'Execution explicitly enabled',
      passed: input.executionEnabled,
      blocker: 'Live execution is disabled until explicitly enabled.',
    },
    {
      name: 'Apollo execution transport configured',
      passed: Boolean(input.transport),
      blocker: 'Apollo execution transport is not configured.',
    },
  ];

  return evaluateProductionReadiness({
    requiredEnvironmentVariables: input.requiredEnvironmentVariables,
    checks,
  });
}
