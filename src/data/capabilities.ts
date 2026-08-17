export interface CapabilityEvidence {
  title: string;
  type: 'whitepaper' | 'architecture' | 'case-study' | 'methodology';
  description: string;
  href?: string;
}

export interface Capability {
  slug: string;
  number: string;
  title: string;
  description: string;
  technologies?: string[];
  outcome?: string;
  evidenceStatus: 'ready-to-populate' | 'pending';
  evidence?: CapabilityEvidence[];
}

export const capabilities: Capability[] = [
  {
    slug: 'rtl-design',
    number: '01',
    title: 'RTL Design',
    description: 'RTL engineering across block, subsystem and SoC development.',
    technologies: ['Verilog', 'SystemVerilog', 'RTL Design'],
    outcome: 'Integration-ready RTL',
    evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'design-verification',
    number: '02',
    title: 'Design Verification',
    description: 'Verification expertise across block, subsystem and SoC levels.',
    technologies: ['SystemVerilog', 'UVM', 'Coverage', 'Assertions'],
    outcome: 'Coverage-driven verification confidence',
    evidenceStatus: 'ready-to-populate',
    evidence: [
      {
        title: 'Reusable UVM Verification Architecture',
        type: 'whitepaper',
        description: 'Configurable SystemVerilog-UVM verification methodology covering reusable agents, drivers, monitors, scoreboards, coverage and assertions.',
        href: '/evidence/reusable-uvm-verification-architecture',
      },
      {
        title: 'PCIe 5.0 Data Link Layer Verification',
        type: 'whitepaper',
        description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.',
        href: '/evidence/pcie-5-data-link-layer-verification',
      },
      {
        title: 'HBM4e Memory Subsystem Verification',
        type: 'whitepaper',
        description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.',
        href: '/evidence/hbm4e-memory-subsystem-verification',
      },
      {
        title: 'Processor-Based Verification Using ARM Cortex-M7',
        type: 'whitepaper',
        description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.',
        href: '/evidence/processor-based-verification-arm-cortex-m7',
      },
      {
        title: 'Formal Verification Planning with Cadence JasperGold',
        type: 'whitepaper',
        description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.',
        href: '/evidence/formal-verification-cadence-jaspergold',
      },
      {
        title: '5G Radio-on-Chip Functional Verification',
        type: 'case-study',
        description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.',
        href: '/evidence/5g-radio-on-chip-functional-verification',
      },
      {
        title: 'End-to-End IoT SoC Verification',
        type: 'case-study',
        description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.',
        href: '/evidence/end-to-end-iot-soc-verification',
      },
      {
        title: 'UFS 4.0 Low-Power Verification',
        type: 'whitepaper',
        description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.',
        href: '/evidence/ufs-4-low-power-verification',
      },
    ],
  },
  {
    slug: 'physical-design',
    number: '03',
    title: 'Physical Design',
    description: 'Physical implementation expertise across complex silicon programs.',
    technologies: ['Floorplanning', 'Placement', 'CTS', 'Routing'],
    outcome: 'Signoff-ready implementation',
    evidenceStatus: 'pending',
  },
  {
    slug: 'dft',
    number: '04',
    title: 'DFT',
    description: 'Design-for-test engineering integrated into the silicon lifecycle.',
    technologies: ['Test Architecture', 'Scan', 'ATPG'],
    outcome: 'Manufacturing-test readiness',
    evidenceStatus: 'ready-to-populate',
    evidence: [
      {
        title: 'DFT Sign-off Methodology for Mixed-Signal IP',
        type: 'whitepaper',
        description: 'Scan chain debugging, ATPG pattern generation, fault coverage, Gate-Level Simulation, IEEE 1149.x boundary scan, CTL generation and DFT sign-off methodology.',
      },
    ],
  },
  {
    slug: 'protocol-verification',
    number: '05',
    title: 'Protocol Verification',
    description: 'Protocol-focused verification for complex semiconductor interfaces.',
    technologies: ['PCIe', 'USB', 'DDR', 'AMBA'],
    outcome: 'Interface-level verification confidence',
    evidenceStatus: 'ready-to-populate',
    evidence: [
      {
        title: 'Reusable UVM Verification Architecture',
        type: 'whitepaper',
        description: 'Reusable SystemVerilog/UVM architecture connecting protocol-aware stimulus, reusable agents, monitoring, scoreboarding, prediction, coverage, assertions and regression analysis.',
        href: '/evidence/reusable-uvm-verification-architecture',
      },
      {
        title: 'PCIe 5.0 Data Link Layer Verification',
        type: 'whitepaper',
        description: 'PCIe data-link verification covering ACK/NAK handling, replay behavior, credit-based flow control, protocol monitoring, error injection and coverage.',
        href: '/evidence/pcie-5-data-link-layer-verification',
      },
      {
        title: 'UFS 4.0 Low-Power Verification',
        type: 'whitepaper',
        description: 'UFS verification covering PMU behavior, power-state transitions, clock/reset control, wake-up behavior, assertions and coverage closure.',
        href: '/evidence/ufs-4-low-power-verification',
      },
      {
        title: 'HBM4e Memory Subsystem Verification',
        type: 'whitepaper',
        description: 'Memory-subsystem verification covering interface behavior, training and calibration-oriented checking, functional coverage and regression analysis.',
        href: '/evidence/hbm4e-memory-subsystem-verification',
      },
    ],
  },
  {
    slug: 'soc-ip',
    number: '06',
    title: 'SoC & IP Engineering',
    description: 'Engineering across IP integration, subsystem development and SoC integration.',
    technologies: ['IP', 'Subsystem', 'SoC Integration'],
    outcome: 'Integration-ready IP, subsystem and SoC delivery',
    evidenceStatus: 'ready-to-populate',
  },
];

export const getCapability = (slug: string) => capabilities.find((capability) => capability.slug === slug);
