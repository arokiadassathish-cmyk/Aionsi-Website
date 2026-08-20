export interface EngineeringProof {
  slug: string;
  title: string;
  capability: string;
  type: 'case-study' | 'architecture' | 'methodology';
  summary: string;
  scope: string[];
  href: string;
}

export const engineeringProof: EngineeringProof[] = [
  {
    slug: 'physical-design-representative-experience',
    title: 'Representative Engineering Experience — Physical Design',
    capability: 'Physical Design',
    type: 'case-study',
    summary: 'Representative advanced-node Physical Design experience spanning implementation, timing closure, congestion optimization, physical verification and sign-off.',
    scope: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing closure', 'Physical verification and sign-off'],
    href: '/evidence/physical-design-representative-engineering-experience',
  },
  {
    slug: 'reusable-uvm-verification-architecture',
    title: 'Reusable UVM Verification Architecture',
    capability: 'Design Verification',
    type: 'methodology',
    summary: 'Reusable SystemVerilog/UVM verification architecture covering agents, stimulus, monitoring, scoreboarding, coverage, assertions and regression analysis.',
    scope: ['UVM architecture', 'Reusable agents', 'Scoreboards and monitors', 'Coverage', 'Assertions', 'Regression workflows'],
    href: '/evidence/reusable-uvm-verification-architecture',
  },
  {
    slug: 'pcie-5-data-link-layer-verification',
    title: 'PCIe 5.0 Data Link Layer Verification',
    capability: 'Protocol Verification',
    type: 'methodology',
    summary: 'Protocol verification methodology covering ACK/NAK handling, replay behavior, credit-based flow control, error injection and coverage.',
    scope: ['ACK/NAK handling', 'Replay behavior', 'Credit-based flow control', 'Error injection', 'Protocol monitoring', 'Functional coverage'],
    href: '/evidence/pcie-5-data-link-layer-verification',
  },
];

export const getEngineeringProof = (slug: string) => engineeringProof.find((item) => item.slug === slug);
