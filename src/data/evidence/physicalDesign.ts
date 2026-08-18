export const physicalDesignEvidenceDetails = {
  'physical-design-representative-engineering-experience': {
    slug: 'physical-design-representative-engineering-experience',
    title: 'Representative Engineering Experience — Physical Design',
    type: 'case-study' as const,
    classification: 'Representative Engineering Experience',
    revision: '1.0',
    positioning: 'Representative AionSi Physical Design experience spanning hierarchical SoC implementation, power and clocking constraints, timing closure, congestion management, routing, physical verification and sign-off.',
    context: [
      'Representative source material covers Physical Design engineering across complex ASIC and SoC implementation programs.',
      'The evidence is presented without customer attribution or unsupported performance claims unless separately approved for public disclosure.',
    ],
    architecture: ['Netlist', 'Floorplan', 'Placement', 'CTS', 'Routing', 'Timing / Physical Verification', 'Sign-Off'],
    methodology: [
      'Hierarchical floorplanning and macro planning aligned to implementation constraints',
      'Placement and congestion optimization against timing and area objectives',
      'Clock-tree synthesis and downstream timing feedback',
      'Routing, ECO and closure iterations supporting physical sign-off',
    ],
    components: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing Closure', 'Physical Verification', 'Sign-Off'],
    evidenceNotes: [
      'Representative experience is derived from approved AionSi source material.',
      'Project-specific customer attribution and proprietary implementation details require separate approval before publication.',
    ],
    sourceLabel: 'AionSi Physical Design — Representative Engineering Experience',
  },
  'advanced-node-physical-design-timing-congestion-signoff': {
    slug: 'advanced-node-physical-design-timing-congestion-signoff',
    title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure',
    type: 'whitepaper' as const,
    classification: 'Technical Engineering Reference',
    revision: '1.0',
    positioning: 'Methodology reference covering advanced-node implementation challenges, timing closure, congestion management, multi-power-domain implementation and physical sign-off practices.',
    context: [
      'The reference addresses the closure interactions that shape advanced-node physical implementation decisions.',
      'The published page is intentionally limited to approved methodology-level content rather than unsupported project metrics.',
    ],
    architecture: ['Floorplan', 'Placement', 'CTS', 'Routing', 'STA / PPA', 'Physical Verification', 'Sign-Off'],
    methodology: [
      'Constraint-aware floorplanning and physical planning',
      'Placement and congestion management with timing feedback',
      'Clock and route optimization with setup/hold closure',
      'Physical verification and sign-off readiness checks',
    ],
    components: ['Timing Closure', 'Congestion Management', 'Multi-Power-Domain', 'ECO Recovery', 'Physical Verification', 'Sign-Off'],
    evidenceNotes: [
      'Methodology content is based on approved AionSi engineering source material.',
      'Customer names, proprietary flows and unsupported results are not implied.',
    ],
    sourceLabel: 'AionSi Physical Design — Advanced-Node Methodology Reference',
  },
} as const;
