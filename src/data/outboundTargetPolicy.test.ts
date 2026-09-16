import { evaluateOutboundTarget } from './outboundTargetPolicy';

describe('Outbound target policy', () => {
  it('blocks SkyeChip because it is an existing customer', () => {
    const result = evaluateOutboundTarget({ slug: 'skyechip', name: 'SkyeChip' });
    expect(result.eligible).toBe(false);
    expect(result.blockers[0]).toContain('existing AionSi customer');
  });

  it('allows a net-new account', () => {
    expect(evaluateOutboundTarget({ slug: 'example', name: 'Example Semiconductor' })).toEqual({
      eligible: true,
      blockers: [],
    });
  });
});
