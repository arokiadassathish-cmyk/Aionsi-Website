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
  { slug: 'reusable-uvm-verification-architecture', title: 'Reusable UVM Verification Architecture', type: 'whitepaper' as const, description: 'Configurable SystemVerilog-UVM verification methodology covering reusable agents, drivers, monitors, scoreboards, coverage and assertions.', capability: 'Design Verification' },
  { slug: 'pcie-5-data-link-layer-verification', title: 'PCIe 5.0 Data Link Layer Verification', type: 'whitepaper' as const, description: 'Verification methodology covering ACK/NAK handling, replay buffers, credit-based flow control, error injection, SVA and functional coverage.', capability: 'Design Verification' },
  { slug: 'hbm4e-memory-subsystem-verification', title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper' as const, description: 'Subsystem verification covering controller, PHY, training logic, third-party model integration, functional coverage and regression automation.', capability: 'Design Verification' },
  { slug: 'processor-based-verification-arm-cortex-m7', title: 'Processor-Based Verification Using ARM Cortex-M7', type: 'whitepaper' as const, description: 'Software-driven verification covering memory access, register validation, interrupts and subsystem initialization.', capability: 'Design Verification' },
  { slug: 'formal-verification-cadence-jaspergold', title: 'Formal Verification Planning with Cadence JasperGold', type: 'whitepaper' as const, description: 'Structural verification planning for crossbar, multiplexer, clock, reset and overflow logic to complement simulation-based verification.', capability: 'Design Verification' },
  { slug: '5g-radio-on-chip-functional-verification', title: '5G Radio-on-Chip Functional Verification', type: 'case-study' as const, description: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.', capability: 'Design Verification' },
  { slug: 'end-to-end-iot-soc-verification', title: 'End-to-End IoT SoC Verification', type: 'case-study' as const, description: 'IP-to-SoC verification scope including reusable environments, third-party IP integration, RTL verification, GLS and final verification sign-off.', capability: 'Design Verification' },
  { slug: 'ufs-4-low-power-verification', title: 'UFS 4.0 Low-Power Verification', type: 'whitepaper' as const, description: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.', capability: 'Design Verification' },
  { slug: 'physical-design-representative-engineering-experience', title: 'Representative Engineering Experience — Physical Design', type: 'case-study' as const, description: 'Representative advanced-node Physical Design experience spanning floorplanning, placement, CTS, routing, timing closure, congestion optimization, physical verification and sign-off across 3nm–28nm programs.', capability: 'Physical Design' },
  { slug: 'advanced-node-physical-design-timing-congestion-signoff', title: 'Advanced-Node Physical Design: Timing, Congestion & Sign-Off Closure', type: 'whitepaper' as const, description: 'Engineering whitepaper covering advanced-node physical implementation challenges, timing closure, congestion management, multi-power-domain implementation and physical sign-off practices.', capability: 'Physical Design' },
  { slug: 'dft-signoff-methodology-mixed-signal-ip', title: 'DFT Sign-off Methodology for Mixed-Signal IP', type: 'whitepaper' as const, description: 'Scan chain debugging, ATPG pattern generation, fault coverage, gate-level simulation, IEEE 1149.x boundary scan, CTL generation and DFT sign-off methodology.', capability: 'DFT' },
  { slug: 'tarang-soc-architecture-and-verification', title: 'Tarang SoC — Architecture and Verification Specification', type: 'whitepaper' as const, description: '8051-class SoC architecture and software-driven verification environment covering the ATOM51 CPU, 32 kB SRAM, AMBA APB3 subsystem, 15 peripheral instances, mailbox handshake, self-checking firmware and a 120-test regression.', capability: 'SoC & IP Engineering' },
  { slug: 'opentitan-earl-grey-secure-soc-verification', title: 'OpenTitan Earl Grey — Secure SoC Verification', type: 'case-study' as const, description: 'Representative secure-SoC verification evidence covering RTL/UVM/SystemVerilog, formal verification, life-cycle and reset verification, power/reset/control checks, cryptography verification and coverage/regression analysis.', capability: 'SoC & IP Engineering' },
];

const buildEvidenceDetail = (item: typeof approvedEvidence[number]): EvidenceDetail => {
  const isPhysicalDesign = item.capability === 'Physical Design';
  const isDft = item.capability === 'DFT';
  const isSocIp = item.capability === 'SoC & IP Engineering';
  const isTarang = item.slug === 'tarang-soc-architecture-and-verification';
  const isOpenTitan = item.slug === 'opentitan-earl-grey-secure-soc-verification';

  return {
    slug: item.slug,
    title: item.title,
    type: item.type,
    capability: item.capability,
    revision: '1.0',
    classification: item.type === 'case-study' ? 'Engineering Case Study' : 'Technical Engineering Reference',
    positioning: item.description,
    context: isPhysicalDesign
      ? ['Representative AionSi Physical Design evidence covering implementation planning, floorplanning, placement, CTS, routing, timing closure, physical verification and sign-off.', 'The evidence is limited to the approved engineering description; customer attribution and unsupported implementation or performance claims are not implied.']
      : isDft
        ? ['Representative DFT engineering evidence covering scan, ATPG, fault coverage, gate-level simulation, boundary-scan/CTL activities and sign-off methodology.', 'The evidence is limited to the approved DFT methodology description; customer attribution and unsupported silicon-quality or coverage claims are not implied.']
        : isSocIp
          ? ['AionSi SoC & IP engineering evidence spanning architecture, subsystem integration and verification workflows.', 'The page is intentionally limited to approved technical evidence; customer attribution and unsupported performance claims are not implied.']
          : ['This evidence page presents the approved AionSi engineering scope associated with the capability library entry.', 'The page is intentionally limited to the evidence description available in the approved source material; customer attribution and unsupported performance claims are not implied.'],
    architecture: isPhysicalDesign
      ? ['Netlist', 'Floorplan', 'Placement', 'Clock-tree synthesis', 'Routing', 'Timing / physical verification', 'Sign-off']
      : isDft
        ? ['Test architecture', 'Scan insertion', 'ATPG', 'Fault coverage', 'Gate-level simulation', 'Boundary scan / CTL', 'DFT sign-off']
        : isTarang
          ? ['ATOM51 CPU', '32 kB SRAM', 'EMIF-to-APB3 bridge', 'APB peripheral subsystem', '15 peripheral instances', 'CPU-to-testbench mailbox', 'Verification regression']
          : isOpenTitan
            ? ['RISC-V Ibex core', 'TileLink-UL interconnect', 'Security / lifecycle controls', 'Cryptography blocks', 'Memory / controller subsystem', 'Peripheral integration', 'UVM / formal verification']
            : isSocIp
              ? ['IP architecture', 'Subsystem integration', 'SoC interconnect', 'Peripheral / control integration', 'Verification environment', 'System validation', 'Integration / sign-off']
              : ['Verification planning', 'Verification environment', 'Stimulus and checking', 'Coverage and analysis', 'Regression and debug', 'Closure / sign-off readiness'],
    methodology: isPhysicalDesign
      ? ['Implementation planning aligned to hierarchy, power, clocking and physical constraints', 'Floorplanning, placement, CTS and routing refinement driven by congestion and timing objectives', 'Static timing, physical verification and sign-off readiness checks supporting closure', 'Implementation feedback and ECO iteration through downstream closure activities']
      : isDft
        ? ['DFT planning aligned to scan architecture, controllability and observability requirements', 'Scan-chain insertion and debug across implementation stages', 'ATPG pattern generation and fault-coverage analysis', 'Gate-level and boundary-scan checks supporting DFT sign-off readiness']
        : isTarang
          ? ['Directed software-driven verification executed on the real CPU', 'Self-checking C / assembly tests with a CPU-to-testbench mailbox', 'Protocol partners, monitors, scoreboards and targeted error injection', 'Automated build and regression flow with measured pass/fail verdicts']
          : isOpenTitan
            ? ['SystemVerilog/UVM verification environment', 'Directed and constrained-random verification where appropriate', 'Formal verification and property checking for selected blocks', 'Coverage, regression analysis and debug supporting verification closure']
            : ['Verification planning aligned to defined requirements and objectives', 'Reusable simulation and/or verification infrastructure where applicable', 'Stimulus, checking and assertion-based validation as defined by the evidence scope', 'Coverage, regression and debug activities supporting verification closure'],
    components: isPhysicalDesign
      ? ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing closure', 'Physical verification', 'Sign-off']
      : isDft
        ? ['Test architecture', 'Scan chains', 'ATPG', 'Fault simulation', 'Gate-level simulation', 'Boundary scan / CTL', 'Sign-off analysis']
        : isTarang
          ? ['ATOM51', '32 kB SRAM', 'AMBA APB3', 'UART / I2C / SPI / GPIO / PWM', 'Mailbox / self-check layer', 'Monitors / scoreboard', 'Regression automation']
          : isOpenTitan
            ? ['RISC-V / Ibex', 'TileLink', 'Security blocks', 'Cryptography', 'Lifecycle / reset', 'UVM / formal', 'Coverage / regression']
            : isSocIp
              ? ['IP blocks', 'Subsystem integration', 'Interconnect / bus', 'Peripherals', 'Verification environment', 'System debug', 'Integration release']
              : ['Verification environment', 'Stimulus', 'Checkers / assertions', 'Coverage', 'Regression', 'Debug / analysis'],
    evidenceNotes: isTarang
      ? ['Source: Tarang SoC — Architecture and Verification Specification, Version 1.0, submitted as a technical specification / conference submission and marked For review.', 'The source documents a recorded regression of 120 tests with 120 passed, 0 failed and 0 unknown; this is presented as a document-reported verification result, not as a production-silicon claim.']
      : ['Content on this page is derived from the approved capability evidence description.', 'Detailed project-specific implementation data should only be added after the corresponding engineering source material is approved for publication.'],
    sourceLabel: `AionSi Engineering Evidence — ${item.title}`,
  };
};

export const evidenceDetails: Record<string, EvidenceDetail> = Object.fromEntries(approvedEvidence.map((item) => [item.slug, buildEvidenceDetail(item)]));
export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
