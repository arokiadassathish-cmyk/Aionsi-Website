import { describe, expect, it } from 'vitest';
import { evaluateExecutionReadiness } from './executionReadinessGuard';

const transport = {
  enroll: async () => undefined,
  activate: async () => undefined,
};

describe('evaluateExecutionReadiness', () => {
  it('allows dry-run without production prerequisites', () => {
    const result = evaluateExecutionReadiness({
      mode: 'dry_run',
      approved: false,
      executionEnabled: false,
      requiredEnvironmentVariables: {},
    });

    expect(result.ready).toBe(true);
    expect(result.blockers).toEqual([]);
  });

  it('blocks live execution without explicit approval', () => {
    const result = evaluateExecutionReadiness({
      mode: 'live',
      approved: false,
      executionEnabled: true,
      requiredEnvironmentVariables: {
        APOLLO_API_KEY: 'configured',
        HUBSPOT_ACCESS_TOKEN: 'configured',
      },
      transport,
    });

    expect(result.ready).toBe(false);
    expect(result.blockers).toContain('Live execution requires explicit human approval.');
  });

  it('blocks live execution when execution is disabled', () => {
    const result = evaluateExecutionReadiness({
      mode: 'live',
      approved: true,
      executionEnabled: false,
      requiredEnvironmentVariables: {
        APOLLO_API_KEY: 'configured',
      },
      transport,
    });

    expect(result.ready).toBe(false);
    expect(result.blockers).toContain('Live execution is disabled until explicitly enabled.');
  });

  it('blocks live execution when required configuration or transport is missing', () => {
    const result = evaluateExecutionReadiness({
      mode: 'live',
      approved: true,
      executionEnabled: true,
      requiredEnvironmentVariables: {
        APOLLO_API_KEY: undefined,
      },
    });

    expect(result.ready).toBe(false);
    expect(result.blockers).toContain('Missing required environment variable: APOLLO_API_KEY');
    expect(result.blockers).toContain('Apollo execution transport is not configured.');
  });

  it('passes live readiness only when every gate is satisfied', () => {
    const result = evaluateExecutionReadiness({
      mode: 'live',
      approved: true,
      executionEnabled: true,
      requiredEnvironmentVariables: {
        APOLLO_API_KEY: 'configured',
        HUBSPOT_ACCESS_TOKEN: 'configured',
      },
      transport,
      checks: [{ name: 'E2E dry-run passed', passed: true }],
    });

    expect(result.ready).toBe(true);
    expect(result.blockers).toEqual([]);
  });
});
