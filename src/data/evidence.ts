export interface EvidenceDetail {
  slug: string;
  title: string;
  type: 'whitepaper' | 'case-study';
  capability: string;
  revision: string;
  classification: string;
  positioning: string;
  context: string[];
  architecture: string[];
  methodology: string[];
  components: string[];
  evidenceNotes: string[];
  sourceLabel: string;
}

const approvedEvidence = [
  {
    slug: 'reusable-uvm-verification-architecture',
    title: 'Reusable UVM Verification Architecture',
    type: 'whitepaper' as const,
    description: 'Configurable SystemVerilog-UVM verification methodology covering reusable agents, drivers, monitors, scoreboards, coverage and assertions.',
  },
  {
    slug: 'pcie-5-data-link-layer-verification',
    title: 'PCIe 5.0 Data Link Layer Verification',
    type: 'whitepaper' as const,
    description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.',
  },
  {
    slug: 'hbm4e-memory-subsystem-verification',
    title: 'HBM4e Memory Subsystem Verification',
    type: 'whitepaper' as const,
    description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.',
  },
  {
    slug: 'processor-based-verification-arm-cortex-m7',
    title: 'Processor-Based Verification Using ARM Cortex-M7',
    type: 'whitepaper' as const,
    description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.',
  },
  {
    slug: 'formal-verification-cadence-jaspergold',
    title: 'Formal Verification Planning with Cadence JasperGold',
    type: 'whitepaper' as const,
    description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.',
  },
  {
    slug: '5g-radio-on-chip-functional-verification',
    title: '5G Radio-on-Chip Functional Verification',
    type: 'case-study' as const,
    description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.',
  },
  {
    slug: 'end-to-end-iot-soc-verification',
    title: 'End-to-End IoT SoC Verification',
    type: 'case-study' as const,
    description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.',
  },
  {
    slug: 'ufs-4-low-power-verification',
    title: 'UFS 4.0 Low-Power Verification',
    type: 'whitepaper' as const,
    description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.',
  },
];

const buildEvidenceDetail = (item: typeof approvedEvidence[number]): EvidenceDetail => ({
  slug: item.slug,
  title: item.title,
  type: item.type,
  capability: 'Design Verification',
  revision: '1.0',
  classification: item.type === 'case-study' ? 'Engineering Case Study' : 'Technical Engineering Reference',
  positioning: item.description,
  context: [
    'This evidence page presents the approved AionSi engineering scope associated with the capability library entry.',
    'The page is intentionally limited to the evidence description available in the approved source material; customer attribution and unsupported performance claims are not implied.',
  ],
  architecture: ['Verification planning', 'Verification environment', 'Stimulus and checking', 'Coverage and analysis', 'Regression and debug', 'Closure / sign-off readiness'],
  methodology: [
    'Verification planning aligned to defined requirements and objectives',
    'Reusable simulation and/or verification infrastructure where applicable',
    'Stimulus, checking and assertion-based validation as defined by the evidence scope',
    'Coverage, regression and debug activities supporting verification closure',
  ],
  components: ['Verification environment', 'Stimulus', 'Checkers / assertions', 'Coverage', 'Regression', 'Debug / analysis'],
  evidenceNotes: [
    'Content on this page is derived from the approved capability evidence description.',
    'Detailed project-specific implementation data should only be added after the corresponding engineering source material is approved for publication.',
  ],
  sourceLabel: `AionSi Engineering Evidence — ${item.title}`,
});

const buildPhysicalDesignDetail = (item: {
  slug: string;
  title: string;
  type: 'whitepaper' | 'case-study';
  classification: string;
  positioning: string;
  context: string[];
  architecture: string[];
  methodology: string[];
  components: string[];
  evidenceNotes: string[];
  sourceLabel: string;
}): EvidenceDetail => ({
  ...item,
  capability: 'Physical Design',
});

export const evidenceDetails: Record<string, EvidenceDetail> = {
  ...Object.fromEntries(approvedEvidence.map((item) => [item.slug, buildEvidenceDetail(item)])),
  'physical-design-representative-engineering-experience': buildPhysicalDesignDetail({
    slug: 'physical-design-representative-engineering-experience',
    title: 'Representative Engineering Experience — Physical Design',
    type: 'case-study',
    classification: 'Representative Engineering Experience',
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
  }),
  'advanced-node-physical-design-timing-congestion-signoff': buildPhysicalDesignDetail({
    slug: 'advanced-node-physical-design-timing-congestion-signoff',
    title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure',
    type: 'whitepaper',
    classification: 'Technical Engineering Reference',
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
  }),
};

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
