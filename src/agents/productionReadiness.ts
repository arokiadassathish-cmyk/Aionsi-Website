export interface ProductionReadinessInput {
  requiredEnvironmentVariables: Record<string, string | undefined>;
  checks: Array<{ name: string; passed: boolean; blocker?: string }>;
}

export interface ProductionReadinessResult {
  ready: boolean;
  blockers: string[];
  passed: string[];
}

/** Deterministic release gate for the outbound agent. */
export function evaluateProductionReadiness(
  input: ProductionReadinessInput,
): ProductionReadinessResult {
  const blockers: string[] = [];
  const passed: string[] = [];

  for (const [name, value] of Object.entries(input.requiredEnvironmentVariables)) {
    if (!value?.trim()) blockers.push(`Missing required environment variable: ${name}`);
    else passed.push(`Environment configured: ${name}`);
  }

  for (const check of input.checks) {
    if (check.passed) passed.push(check.name);
    else blockers.push(check.blocker || `${check.name} failed.`);
  }

  return { ready: blockers.length === 0, blockers, passed };
}
