import { describe, expect, it } from 'vitest';
import { evaluateDailyItemExecutionReadiness } from './dailyCampaignRuntimeReadiness';
import type { DailyCampaignItem } from './dailyCampaignRuntime';

const baseItem: DailyCampaignItem = {
  accountId: 'acct-1',
  accountName: 'Example Semiconductor',
  slug: 'example-semiconductor',
  status: 'ready_for_approval',
  blockers: [],
  createdAt: new Date().toISOString(),
};

describe('evaluateDailyItemExecutionReadiness', () => {
  it('allows dry-run evaluation', () => {
    const result = evaluateDailyItemExecutionReadiness(baseItem, {
      mode: 'dry_run',
      requiredEnvironmentVariables: {},
    });

    expect(result.ready).toBe(true);
  });

  it('requires account-specific approval for live execution', () => {
    const result = evaluateDailyItemExecutionReadiness(baseItem, {
      mode: 'live',
      requiredEnvironmentVariables: { APOLLO_API_KEY: 'configured' },
      executionEnabled: true,
      transportConfigured: true,
      approvedAccountIds: [],
    });

    expect(result.ready).toBe(false);
    expect(result.blockers).toContain('Live execution requires explicit human approval.');
  });

  it('blocks live execution when the campaign item has unresolved blockers', () => {
    const result = evaluateDailyItemExecutionReadiness(
      { ...baseItem, blockers: ['Missing verified contact email'] },
      {
        mode: 'live',
        requiredEnvironmentVariables: { APOLLO_API_KEY: 'configured' },
        executionEnabled: true,
        transportConfigured: true,
        approvedAccountIds: ['acct-1'],
      },
    );

    expect(result.ready).toBe(false);
    expect(result.blockers).toContain('Campaign item contains unresolved blockers.');
  });

  it('passes only when approval, execution enablement, config, transport and item checks pass', () => {
    const result = evaluateDailyItemExecutionReadiness(baseItem, {
      mode: 'live',
      requiredEnvironmentVariables: {
        APOLLO_API_KEY: 'configured',
        HUBSPOT_ACCESS_TOKEN: 'configured',
      },
      executionEnabled: true,
      transportConfigured: true,
      approvedAccountIds: ['acct-1'],
    });

    expect(result.ready).toBe(true);
    expect(result.blockers).toEqual([]);
  });
});
