import { describe, expect, it, vi } from 'vitest';
import { createApolloExecutionAdapter } from './apolloExecutionAdapter';

describe('Apollo execution adapter', () => {
  it('performs no external call in dry-run enrollment', async () => {
    const enroll = vi.fn();
    const adapter = createApolloExecutionAdapter({
      enroll,
      activate: vi.fn(),
    });

    const result = await adapter.enroll({
      sequenceId: 'seq-1',
      contactIds: ['c1', 'c2'],
      emailAccountId: 'mail-1',
      mode: 'dry_run',
    });

    expect(result.ok).toBe(true);
    expect(result.contactCount).toBe(2);
    expect(enroll).not.toHaveBeenCalled();
  });

  it('fails closed when live enrollment has no transport', async () => {
    const adapter = createApolloExecutionAdapter();
    const result = await adapter.enroll({
      sequenceId: 'seq-1',
      contactIds: ['c1'],
      emailAccountId: 'mail-1',
      mode: 'live',
    });

    expect(result.ok).toBe(false);
    expect(result.blockers).toContain('Apollo live execution transport is not configured.');
  });

  it('calls injected transport only for live activation', async () => {
    const activate = vi.fn().mockResolvedValue(undefined);
    const adapter = createApolloExecutionAdapter({
      enroll: vi.fn(),
      activate,
    });

    const result = await adapter.activate({
      sequenceId: 'seq-1',
      mode: 'live',
    });

    expect(result.ok).toBe(true);
    expect(activate).toHaveBeenCalledWith({ sequenceId: 'seq-1' });
  });
});
