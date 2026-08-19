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

const buildEvidenceDetail = (item: typeof approvedEvidence[number]): EvidenceDetail => {
  const detail: EvidenceDetail = {
    slug: item.slug,
    title: item.title,
    type: item.type,
    capability: 'Design Verification',
    revision: '1.0',
    classification: item.type === 'case-study' ? 'Engineering Case Study' : 'Technical Engineering Reference',
    positioning: item.description,
    context: [
      'This evidence page presents the approved AionSi engineering scope associated with the capability library entry.',
      'The page is intentionally limited to the evidence description available in approved source material; customer attribution and unsupported performance claims are not implied.',
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
      'Content on this page is derived from approved capability evidence descriptions and internal engineering profile material supplied for proof review.',
      'Individual profile evidence is used to substantiate engineering depth; it does not by itself establish a public customer relationship or customer endorsement.',
      'Detailed project-specific implementation data should only be added after the corresponding engineering source material is approved for publication.',
    ],
    sourceLabel: `AionSi Engineering Evidence — ${item.title}`,
  };

  if (item.slug === 'reusable-uvm-verification-architecture') {
    detail.context = [
      'Profile evidence shows senior engineering leadership across more than two decades in ASIC design verification, including architecture, IP, subsystem and SoC verification.',
      'The supplied profiles consistently describe SystemVerilog/UVM environments, verification planning, assertions, functional/code coverage and closure as core engineering practices.',
    ];
    detail.methodology = [
      'Build verification plans from specifications and translate them into structured environments, sequences and test cases.',
      'Use reusable UVM environments, agents, monitors, scoreboards, predictors and register models where applicable.',
      'Apply assertions, constrained-random stimulus, protocol-aware checking and functional/code coverage to drive closure.',
      'Use regression, debug and coverage analysis as part of end-to-end verification sign-off workflows.',
    ];
    detail.components = ['UVM environment', 'Agents / drivers / monitors', 'Sequences / tests', 'Scoreboard / predictor', 'Assertions / formal checks', 'Coverage / regression'];
  }

  if (item.slug === 'pcie-5-data-link-layer-verification') {
    detail.context = [
      'The supplied verification profile documents PCIe 5.0 data-link-layer work covering ACK/NAK handling, replay behavior, packet ordering and credit-based flow control.',
      'The same profile describes constrained-random stimulus, error injection, SystemVerilog Assertions and coverage models for protocol compliance and corner-case closure.',
    ];
    detail.methodology = [
      'Develop SystemVerilog/UVM verification environments for the PCIe data-link layer.',
      'Verify ACK/NAK handling, sequence tracking, packet ordering and replay-buffer behavior.',
      'Exercise credit-based flow control with constrained-random stimulus and functional coverage.',
      'Inject DLLP corruption and missing ACK/NAK conditions and use SVA/coverage for closure.',
    ];
    detail.components = ['PCIe DLL UVM environment', 'ACK/NAK monitors', 'Replay-buffer checking', 'Credit-flow stimulus', 'Error injection', 'SVA / functional coverage'];
  }

  if (item.slug === '5g-radio-on-chip-functional-verification') {
    detail.context = [
      'The supplied AionSi engineering profile describes lead-consultant verification work on 5G Radio-on-Chip programs, including MOD subsystems, datapath/linearization, Cortex-M7 processor access and MATLAB model integration.',
      'The profile also documents verification planning for XCONs, MUXes, clock/reset blocks and IP-level verification environments.',
    ];
    detail.methodology = [
      'Develop verification environments from project specifications and defined test plans.',
      'Integrate MATLAB models where model-to-design correlation is required.',
      'Develop processor-driven C/SystemVerilog tests for memory and interrupt scenarios.',
      'Use assertions, coverage and debug to move block/subsystem verification toward closure.',
    ];
    detail.components = ['MOD subsystem environment', 'MATLAB model integration', 'C/SV processor tests', 'XCON / MUX verification', 'Clock/reset verification', 'IP verification environment'];
  }

  if (item.slug === 'end-to-end-iot-soc-verification') {
    detail.context = [
      'The supplied engineering profile describes SoC and IP verification leadership on an IoT SoC, including XOMI subsystem verification, 3G modem verification and integration into the SoC.',
      'The profile also documents GLS environment setup, connectivity and datapath integrity checks, boot/access tests, coverage closure, bug tracking and team-level status reporting.',
    ];
    detail.methodology = [
      'Create verification plans and environments for subsystem and IP scope.',
      'Develop SV/UVM environments for IP verification and integrate subsystems into the SoC.',
      'Use connectivity and datapath integrity checks, boot/access tests and gate-level simulation where required.',
      'Track bugs, coverage closure and verification notes across IP, subsystem and SoC levels.',
    ];
    detail.components = ['IP-level SV/UVM environment', 'SoC integration', 'Connectivity checks', 'Datapath integrity checks', 'GLS environment', 'Coverage / bug tracking'];
  }

  if (item.slug === 'formal-verification-cadence-jaspergold') {
    detail.context = [
      'The supplied senior profiles document hands-on use of Cadence JasperGold for formal verification, including property checking, connectivity validation and targeted formal analysis.',
      'The profiles also describe assertion development and formal verification as a complement to simulation-based verification workflows.',
    ];
    detail.methodology = [
      'Translate verification requirements into assertions and properties.',
      'Use JasperGold for targeted property and connectivity checks.',
      'Debug assertion failures and unresolved properties alongside simulation-based verification.',
      'Use formal results to strengthen confidence in targeted logic and interfaces.',
    ];
    detail.components = ['SVA properties', 'Connectivity checks', 'JasperGold setup', 'Property debug', 'Formal analysis', 'Simulation/formal correlation'];
  }

  return detail;
};

export const evidenceDetails: Record<string, EvidenceDetail> = Object.fromEntries(
  approvedEvidence.map((item) => [item.slug, buildEvidenceDetail(item)]),
);

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
