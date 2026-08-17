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
      { title: 'Reusable UVM Verification Architecture', type: 'whitepaper', description: 'Configurable SystemVerilog-UVM verification methodology covering reusable agents, drivers, monitors, scoreboards, coverage and assertions.', href: '/evidence/reusable-uvm-verification-architecture' },
      { title: 'PCIe 5.0 Data Link Layer Verification', type: 'whitepaper', description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.', href: '/evidence/pcie-5-data-link-layer-verification' },
      { title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper', description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.', href: '/evidence/hbm4e-memory-subsystem-verification' },
      { title: 'Processor-Based Verification Using ARM Cortex-M7', type: 'whitepaper', description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.', href: '/evidence/processor-based-verification-arm-cortex-m7' },
      { title: 'Formal Verification Planning with Cadence JasperGold', type: 'whitepaper', description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.', href: '/evidence/formal-verification-cadence-jaspergold' },
      { title: '5G Radio-on-Chip Functional Verification', type: 'case-study', description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.', href: '/evidence/5g-radio-on-chip-functional-verification' },
      { title: 'End-to-End IoT SoC Verification', type: 'case-study', description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.', href: '/evidence/end-to-end-iot-soc-verification' },
      { title: 'UFS 4.0 Low-Power Verification', type: 'whitepaper', description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.', href: '/evidence/ufs-4-low-power-verification' },
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
    evidence: [{ title: 'DFT Sign-off Methodology for Mixed-Signal IP', type: 'whitepaper', description: 'Scan chain debugging, ATPG pattern generation, fault coverage, Gate-Level Simulation, IEEE 1149.x boundary scan, CTL generation and DFT sign-off methodology.' }],
  },
  {
    slug: 'protocol-verification',
    number: '05',
    title: 'Protocol Verification',
    description: 'High-speed interface and memory protocol verification across block, subsystem and SoC levels.',
    technologies: ['PCIe Gen5 / Gen6', 'USB 3.0 / USB4', 'DDR5 / LPDDR6', 'HBM4e', 'AMBA / AXI', 'UFS', 'MIPI', 'Ethernet'],
    outcome: 'Protocol compliance and interface verification confidence',
    evidenceStatus: 'ready-to-populate',
    evidence: [
      { title: 'Reusable Protocol Verification Architecture', type: 'methodology', description: 'Reference UVM methodology connecting protocol-aware stimulus, reusable agents, monitors, scoreboards, predictors, assertions, coverage and regression analysis.', href: '/evidence/reusable-protocol-verification-architecture' },
      { title: 'PCIe 5.0 / 6.0 Protocol Verification', type: 'whitepaper', description: 'Protocol verification reference covering transaction and data-link behavior, replay, flow control, error handling, assertions and coverage. PCIe Gen6 RTL architecture is maintained as separate engineering architecture evidence.', href: '/evidence/pcie-protocol-verification' },
      { title: 'USB 3.0 / USB4 Protocol Verification', type: 'whitepaper', description: 'Corporate-flyer-backed scope covering packet-layer and link-management verification, error recovery, flow control, compliance scenarios, reusable UVM VIP and interoperability verification.', href: '/evidence/usb4-protocol-verification' },
      { title: 'DDR5 / LPDDR6 Memory Interface Verification', type: 'whitepaper', description: 'Corporate-flyer-backed scope covering memory interface verification, timing compliance, command sequencing, DFI/protocol verification, multi-channel synchronization, checkers, assertions, coverage and regression/debug.', href: '/evidence/ddr5-lpddr6-protocol-verification' },
      { title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper', description: 'Corporate-flyer-backed scope covering JEDEC-compliant multi-channel interface verification, training, calibration, PHY timing alignment, error handling and reliability validation.', href: '/evidence/hbm4e-protocol-verification' },
      { title: 'Reusable AXI Verification IP Environment', type: 'architecture', description: 'Reusable AMBA/AXI master and slave agent architecture supporting sequencers, drivers, monitors, scoreboarding and functional coverage.', href: '/evidence/axi-reusable-verification-ip' },
      { title: 'SoC Verification of Smart Watch', type: 'case-study', description: 'Public AionSi verification case study demonstrating constrained-random verification, scoreboards, assertions, connectivity checks, end-to-end data checks, coverage closure and tape-out execution.', href: '/case-studies' },
      { title: 'Subsystem Verification with MATLAB Integration', type: 'case-study', description: 'Public AionSi verification case study relevant to subsystem-level execution and reference-model correlation.', href: '/case-studies' },
      { title: 'PCIe Gen6 Endpoint RTL Architecture', type: 'architecture', description: 'Confidential engineering architecture reference covering Transaction Layer, Data Link Layer, Physical Layer, Flit architecture, PAM4, FEC/CRC, replay, flow control, LTSSM and lane management. Not presented as a public verification case study.', href: '/evidence/pcie-protocol-verification' },
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
