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
    capability: 'Design Verification',
    description: 'Configurable SystemVerilog-UVM verification methodology covering reusable agents, drivers, monitors, scoreboards, coverage and assertions.',
  },
  {
    slug: 'pcie-5-data-link-layer-verification',
    title: 'PCIe 5.0 Data Link Layer Verification',
    type: 'whitepaper' as const,
    capability: 'Design Verification',
    description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.',
  },
  {
    slug: 'hbm4e-memory-subsystem-verification',
    title: 'HBM4e Memory Subsystem Verification',
    type: 'whitepaper' as const,
    capability: 'Design Verification',
    description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.',
  },
  {
    slug: 'processor-based-verification-arm-cortex-m7',
    title: 'Processor-Based Verification Using ARM Cortex-M7',
    type: 'whitepaper' as const,
    capability: 'Design Verification',
    description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.',
  },
  {
    slug: 'formal-verification-cadence-jaspergold',
    title: 'Formal Verification Planning with Cadence JasperGold',
    type: 'whitepaper' as const,
    capability: 'Design Verification',
    description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.',
  },
  {
    slug: '5g-radio-on-chip-functional-verification',
    title: '5G Radio-on-Chip Functional Verification',
    type: 'case-study' as const,
    capability: 'Design Verification',
    description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.',
  },
  {
    slug: 'end-to-end-iot-soc-verification',
    title: 'End-to-End IoT SoC Verification',
    type: 'case-study' as const,
    capability: 'Design Verification',
    description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.',
  },
  {
    slug: 'ufs-4-low-power-verification',
    title: 'UFS 4.0 Low-Power Verification',
    type: 'whitepaper' as const,
    capability: 'Design Verification',
    description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.',
  },
  {
    slug: 'physical-design-representative-engineering-experience',
    title: 'Representative Engineering Experience — Physical Design',
    type: 'case-study' as const,
    capability: 'Physical Design',
    description: 'Representative advanced-node Physical Design experience spanning floorplanning, placement, CTS, routing, timing closure, congestion optimization, physical verification and sign-off across 3nm–28nm programs.',
    classification: 'Representative Engineering Experience',
    context: [
      'Representative experience covers hierarchical SoC implementation with power and clocking constraints, timing closure, congestion management, routing, physical verification and sign-off.',
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
  {
    slug: 'advanced-node-physical-design-timing-congestion-signoff',
    title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure',
    type: 'whitepaper' as const,
    capability: 'Physical Design',
    description: 'Engineering whitepaper covering advanced-node physical implementation challenges, timing closure, congestion management, multi-power-domain implementation and physical sign-off practices.',
    classification: 'Physical Design Methodology Reference',
    context: [
      'The methodology addresses implementation challenges where timing, congestion, power-domain requirements and physical verification must be considered together.',
      'The evidence is positioned as an engineering methodology reference and does not imply customer attribution or project-specific performance claims.',
    ],
    architecture: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing / PPA', 'Physical Verification', 'Sign-Off'],
    methodology: [
      'Implementation decisions driven by timing closure and congestion recovery',
      'Power-domain and physical constraints incorporated into implementation planning',
      'Timing, routing and physical-rule feedback used for iterative closure',
      'Sign-off readiness established through physical verification and closure evidence',
    ],
    components: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'PrimeTime STA', 'Calibre / ICV'],
    evidenceNotes: [
      'Methodology reference is derived from approved AionSi engineering source material.',
      'Detailed project-specific implementation data should only be added after approval for public disclosure.',
    ],
    sourceLabel: 'AionSi Physical Design Methodology Reference',
  },
];

const buildEvidenceDetail = (item: typeof approvedEvidence[number]): EvidenceDetail => ({
  slug: item.slug,
  title: item.title,
  type: item.type,
  capability: item.capability,
  revision: 'revision' in item && typeof item.revision === 'string' ? item.revision : '1.0',
  classification: 'classification' in item && typeof item.classification === 'string'
    ? item.classification
    : item.type === 'case-study' ? 'Engineering Case Study' : 'Technical Engineering Reference',
  positioning: item.description,
  context: 'context' in item && Array.isArray(item.context)
    ? item.context
    : [
        'This evidence page presents the approved AionSi engineering scope associated with the capability library entry.',
        'The page is intentionally limited to the evidence description available in the approved source material; customer attribution and unsupported performance claims are not implied.',
      ],
  architecture: 'architecture' in item && Array.isArray(item.architecture)
    ? item.architecture
    : ['Verification planning', 'Verification environment', 'Stimulus and checking', 'Coverage and analysis', 'Regression and debug', 'Closure / sign-off readiness'],
  methodology: 'methodology' in item && Array.isArray(item.methodology)
    ? item.methodology
    : [
        'Verification planning aligned to defined requirements and objectives',
        'Reusable simulation and/or verification infrastructure where applicable',
        'Stimulus, checking and assertion-based validation as defined by the evidence scope',
        'Coverage, regression and debug activities supporting verification closure',
      ],
  components: 'components' in item && Array.isArray(item.components)
    ? item.components
    : ['Verification environment', 'Stimulus', 'Checkers / assertions', 'Coverage', 'Regression', 'Debug / analysis'],
  evidenceNotes: 'evidenceNotes' in item && Array.isArray(item.evidenceNotes)
    ? item.evidenceNotes
    : [
        'Content on this page is derived from the approved capability evidence description.',
        'Detailed project-specific implementation data should only be added after the corresponding engineering source material is approved for publication.',
      ],
  sourceLabel: 'sourceLabel' in item && typeof item.sourceLabel === 'string'
    ? item.sourceLabel
    : `AionSi Engineering Evidence — ${item.title}`,
});

export const evidenceDetails: Record<string, EvidenceDetail> = Object.fromEntries(
  approvedEvidence.map((item) => [item.slug, buildEvidenceDetail(item)]),
);

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
