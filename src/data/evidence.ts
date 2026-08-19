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
    capability: 'Design Verification',
  },
  {
    slug: 'pcie-5-data-link-layer-verification',
    title: 'PCIe 5.0 Data Link Layer Verification',
    type: 'whitepaper' as const,
    description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.',
    capability: 'Design Verification',
  },
  {
    slug: 'hbm4e-memory-subsystem-verification',
    title: 'HBM4e Memory Subsystem Verification',
    type: 'whitepaper' as const,
    description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.',
    capability: 'Design Verification',
  },
  {
    slug: 'processor-based-verification-arm-cortex-m7',
    title: 'Processor-Based Verification Using ARM Cortex-M7',
    type: 'whitepaper' as const,
    description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.',
    capability: 'Design Verification',
  },
  {
    slug: 'formal-verification-cadence-jaspergold',
    title: 'Formal Verification Planning with Cadence JasperGold',
    type: 'whitepaper' as const,
    description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.',
    capability: 'Design Verification',
  },
  {
    slug: '5g-radio-on-chip-functional-verification',
    title: '5G Radio-on-Chip Functional Verification',
    type: 'case-study' as const,
    description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.',
    capability: 'Design Verification',
  },
  {
    slug: 'end-to-end-iot-soc-verification',
    title: 'End-to-End IoT SoC Verification',
    type: 'case-study' as const,
    description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.',
    capability: 'Design Verification',
  },
  {
    slug: 'ufs-4-low-power-verification',
    title: 'UFS 4.0 Low-Power Verification',
    type: 'whitepaper' as const,
    description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.',
    capability: 'Design Verification',
  },
  {
    slug: 'physical-design-representative-engineering-experience',
    title: 'Representative Engineering Experience — Physical Design',
    type: 'case-study' as const,
    description: 'Representative advanced-node Physical Design experience spanning floorplanning, placement, CTS, routing, timing closure, congestion optimization, physical verification and sign-off across 3nm–28nm programs.',
    capability: 'Physical Design',
  },
  {
    slug: 'advanced-node-physical-design-timing-congestion-signoff',
    title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure',
    type: 'whitepaper' as const,
    description: 'Engineering whitepaper covering advanced-node physical implementation challenges, timing closure, congestion management, multi-power-domain implementation and physical sign-off practices.',
    capability: 'Physical Design',
  },
];

const buildEvidenceDetail = (item: typeof approvedEvidence[number]): EvidenceDetail => ({
  slug: item.slug,
  title: item.title,
  type: item.type,
  capability: item.capability,
  revision: '1.0',
  classification: item.type === 'case-study' ? 'Engineering Case Study' : 'Technical Engineering Reference',
  positioning: item.description,
  context: [
    `This evidence page presents the approved AionSi engineering scope associated with the ${item.capability} capability library entry.`,
    'The page is intentionally limited to the evidence description available in the approved source material; customer attribution and unsupported performance claims are not implied.',
  ],
  architecture: item.capability === 'Physical Design'
    ? ['Netlist', 'Floorplan', 'Placement', 'Clock-tree synthesis', 'Routing', 'Timing / physical verification', 'Sign-off']
    : ['Verification planning', 'Verification environment', 'Stimulus and checking', 'Coverage and analysis', 'Regression and debug', 'Closure / sign-off readiness'],
  methodology: item.capability === 'Physical Design'
    ? [
        'Implementation planning aligned to hierarchy, power, clocking and physical constraints',
        'Floorplanning, placement, CTS and routing refinement driven by congestion and timing objectives',
        'Static timing, physical verification and sign-off readiness checks supporting closure',
        'Implementation feedback and ECO iteration through downstream closure activities',
      ]
    : [
        'Verification planning aligned to defined requirements and objectives',
        'Reusable simulation and/or verification infrastructure where applicable',
        'Stimulus, checking and assertion-based validation as defined by the evidence scope',
        'Coverage, regression and debug activities supporting verification closure',
      ],
  components: item.capability === 'Physical Design'
    ? ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing closure', 'Physical verification', 'Sign-off']
    : ['Verification environment', 'Stimulus', 'Checkers / assertions', 'Coverage', 'Regression', 'Debug / analysis'],
  evidenceNotes: [
    'Content on this page is derived from the approved capability evidence description.',
    'Detailed project-specific implementation data should only be added after the corresponding engineering source material is approved for publication.',
  ],
  sourceLabel: `AionSi Engineering Evidence — ${item.title}`,
});

export const evidenceDetails: Record<string, EvidenceDetail> = Object.fromEntries(
  approvedEvidence.map((item) => [item.slug, buildEvidenceDetail(item)]),
);

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
