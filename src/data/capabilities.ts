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
    slug: 'rtl-design', number: '01', title: 'RTL Design',
    description: 'RTL engineering across block, subsystem and SoC development.',
    technologies: ['Verilog', 'SystemVerilog', 'RTL Design'], outcome: 'Integration-ready RTL', evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'design-verification', number: '02', title: 'Design Verification',
    description: 'Verification expertise across block, subsystem and SoC levels.',
    technologies: ['SystemVerilog', 'UVM', 'Coverage', 'Assertions'], outcome: 'Coverage-driven verification confidence', evidenceStatus: 'ready-to-populate',
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
    slug: 'physical-design', number: '03', title: 'Physical Design',
    description: 'Physical implementation, timing closure and physical verification across complex silicon programs from netlist through sign-off.',
    technologies: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'PrimeTime STA', 'Calibre / ICV'], outcome: 'Signoff-ready implementation', evidenceStatus: 'ready-to-populate',
    evidence: [
      { title: 'Representative Engineering Experience — Physical Design', type: 'case-study', description: 'Representative advanced-node Physical Design experience spanning floorplanning, placement, CTS, routing, timing closure, congestion optimization, physical verification and sign-off across 3nm–28nm programs.', href: '/evidence/physical-design-representative-engineering-experience' },
      { title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure', type: 'whitepaper', description: 'Engineering whitepaper covering advanced-node physical implementation challenges, timing closure, congestion management, multi-power-domain implementation and physical sign-off practices.', href: '/evidence/advanced-node-physical-design-timing-congestion-signoff' },
    ],
  },
  {
    slug: 'dft', number: '04', title: 'DFT',
    description: 'Design-for-test engineering integrated into the silicon lifecycle.',
    technologies: ['Test Architecture', 'Scan', 'ATPG'], outcome: 'Manufacturing-test readiness', evidenceStatus: 'ready-to-populate',
    evidence: [
      { title: 'DFT Sign-off Methodology for Mixed-Signal IP', type: 'whitepaper', description: 'Scan chain debugging, ATPG pattern generation, fault coverage, Gate-Level Simulation, IEEE 1149.x boundary scan, CTL generation and DFT sign-off methodology.', href: '/evidence/dft-signoff-methodology-mixed-signal-ip' },
    ],
  },
  {
    slug: 'protocol-verification', number: '05', title: 'Protocol Verification',
    description: 'Protocol-focused verification for complex semiconductor interfaces.',
    technologies: ['PCIe', 'USB', 'DDR', 'HBM', 'AMBA'], outcome: 'Interface-level verification confidence', evidenceStatus: 'ready-to-populate',
    evidence: [
      { title: 'Reusable UVM Verification Architecture', type: 'whitepaper', description: 'Reusable SystemVerilog/UVM architecture connecting protocol-aware stimulus, reusable agents, monitoring, scoreboarding, prediction, coverage, assertions and regression analysis.', href: '/evidence/reusable-uvm-verification-architecture' },
      { title: 'PCIe 5.0 Data Link Layer Verification', type: 'whitepaper', description: 'PCIe data-link verification covering ACK/NAK handling, replay behavior, credit-based flow control, protocol monitoring, error injection and coverage.', href: '/evidence/pcie-5-data-link-layer-verification' },
      { title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper', description: 'HBM memory-subsystem verification covering controller, PHY, training behavior, checking, coverage and regression workflows.', href: '/evidence/hbm4e-memory-subsystem-verification' },
    ],
  },
  {
    slug: 'soc-ip', number: '06', title: 'SoC & IP Engineering',
    description: 'Engineering across processor, interconnect, memory, security and high-speed protocol IP with SoC integration.',
    technologies: ['RISC-V', 'AMBA CHI / AXI', 'PCIe Gen6', 'DDR4 / DDR5', 'HBM2e / HBM3', 'USB 3.x / USB4', 'Secure SoC'],
    outcome: 'Integration-ready IP, subsystem and SoC delivery', evidenceStatus: 'ready-to-populate',
    evidence: [
      { title: 'RISC-V Processor Core Family', type: 'architecture', description: 'AionSi processor portfolio spanning embedded through performance and multi-core cluster tiers, with RV32/RV64 support and AXI/CHI integration.', href: '/evidence/risc-v-processor-core-family' },
      { title: 'AMBA CHI & AXI Interconnect Fabrics', type: 'architecture', description: 'AionSi CHI and AXI fabric portfolio covering coherent interconnect, QoS, configurable topologies and heterogeneous SoC integration.', href: '/evidence/amba-chi-axi-interconnect-fabrics' },
      { title: 'PCIe Gen6 Data Link Layer', type: 'architecture', description: 'PCIe Gen6 DLL IP covering LTSSM, flow control, packet processing, error detection/recovery and power management.', href: '/evidence/pcie-gen6-data-link-layer' },
      { title: 'DDR4 & DDR5 Memory Controllers', type: 'architecture', description: 'Memory-controller portfolio covering command scheduling, PHY abstraction, refresh management, ECC and RAS.', href: '/evidence/ddr4-ddr5-memory-controllers' },
      { title: 'HBM2e & HBM3 Memory Controllers', type: 'architecture', description: 'High-bandwidth memory controller portfolio covering arbitration, QoS-aware scheduling, thermal management and AXI/CHI interfaces.', href: '/evidence/hbm2e-hbm3-memory-controllers' },
      { title: 'USB 3.x & USB4 Controllers', type: 'architecture', description: 'USB controller portfolio covering PHY/link/protocol layers, link training, power delivery and error recovery.', href: '/evidence/usb-3x-usb4-controllers' },
      { title: 'Tarang SoC Engineering Experience', type: 'case-study', description: 'Representative SoC engineering experience spanning RISC-V, PCIe Gen6, DDR4/LPDDR4, HBM, USB3, Ethernet, security, FPGA prototyping and embedded software.', href: '/evidence/tarang-soc-engineering-experience' },
      { title: 'OpenTitan Cryptography & Secure SoC Integration', type: 'whitepaper', description: 'Technical reference covering OpenTitan Darjeeling-based secure SoC integration, Earl Grey context, hardware cryptography, secure boot, key management and security-oriented verification.', href: '/evidence/opentitan-cryptography-secure-soc' },
    ],
  },
];

export const getCapability = (slug: string) => capabilities.find((capability) => capability.slug === slug);
