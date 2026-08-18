export const physicalDesignScope = {
  hero: {
    eyebrow: 'ENGINEERING CAPABILITY',
    title: 'Physical Design',
    description:
      'Physical implementation across complex SoC and ASIC programs — from floorplanning and placement through timing, congestion, routing, physical verification and sign-off.',
  },
  technologies: [
    'Floorplanning',
    'Placement',
    'CTS',
    'Routing',
    'PrimeTime STA',
    'Calibre / ICV',
  ],
  contributions: [
    {
      title: 'Floorplanning & Power Intent',
      description: 'Hierarchical floorplanning, macro planning, power-domain strategy and physical constraints for implementation-ready blocks.',
    },
    {
      title: 'Placement & Optimization',
      description: 'Placement refinement, congestion control, cell-density management and implementation optimization against timing and area objectives.',
    },
    {
      title: 'Clock-Tree Synthesis',
      description: 'Clock implementation and balancing with attention to skew, latency, transition and downstream timing closure.',
    },
    {
      title: 'Routing & Signal Integrity',
      description: 'Detailed routing and closure support for complex interconnect, congestion, transition, capacitance and physical-rule constraints.',
    },
    {
      title: 'Timing & PPA Closure',
      description: 'Static timing analysis, path-group driven optimization and implementation feedback for timing, power and area closure.',
    },
    {
      title: 'Physical Verification & Sign-Off',
      description: 'DRC, LVS, extraction-aware closure, sign-off readiness and engineering handoff into final delivery.',
    },
  ],
  flow: [
    ['01', 'Floorplan', 'Hierarchy, macros, power domains'],
    ['02', 'Placement', 'Density, congestion, optimization'],
    ['03', 'CTS', 'Clock balance, skew, latency'],
    ['04', 'Routing', 'Signal and physical-rule closure'],
    ['05', 'Timing / PPA', 'STA, ECO and implementation feedback'],
    ['06', 'Sign-Off', 'Physical verification and release readiness'],
  ],
  outcomes: [
    'Implementation-ready physical database',
    'Timing and congestion closure',
    'Physical verification readiness',
    'Sign-off focused engineering handoff',
  ],
  evidence: [
    {
      type: 'case-study',
      title: 'Representative Engineering Experience — Physical Design',
      description: 'Approved representative Physical Design evidence covering hierarchical SoC implementation, power and clocking constraints, timing closure, congestion management, routing and sign-off.',
      href: '/evidence/physical-design-representative-engineering-experience',
    },
    {
      type: 'whitepaper',
      title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure',
      description: 'Methodology reference covering advanced-node implementation challenges, timing closure, congestion management, multi-power-domain implementation and sign-off practices.',
      href: '/evidence/advanced-node-physical-design-timing-congestion-signoff',
    },
  ],
} as const;
