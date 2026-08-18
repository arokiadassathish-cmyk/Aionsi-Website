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

type EvidenceInput = Omit<EvidenceDetail, 'capability' | 'revision' | 'evidenceNotes' | 'sourceLabel'> & {
  classification?: string;
};

const makeDetail = (input: EvidenceInput): EvidenceDetail => ({
  ...input,
  capability: 'Design Verification',
  revision: '1.0',
  classification: input.classification ?? 'Engineering Evidence Reference',
  evidenceNotes: [
    'This page summarizes the engineering scope represented by the approved AionSi capability material.',
    'No customer attribution or project-specific performance claim is implied unless explicitly supported by approved source material.',
  ],
  sourceLabel: `AionSi Engineering Evidence — ${input.title}`,
});

export const evidenceDetails: Record<string, EvidenceDetail> = {
  'reusable-uvm-verification-architecture': makeDetail({
    slug: 'reusable-uvm-verification-architecture',
    title: 'Reusable UVM Verification Architecture',
    type: 'whitepaper',
    classification: 'Technical Reference Architecture',
    positioning: 'Reusable SystemVerilog/UVM verification architecture for block, subsystem and SoC verification, connecting stimulus, checking, coverage and regression analysis.',
    context: ['Reusable verification infrastructure helps reduce repeated environment development and maintain consistent verification patterns across programs.', 'The architecture connects reusable agents and stimulus with checking, coverage, assertions and regression analysis for structured verification closure.'],
    architecture: ['Test and sequence layer', 'Environment and reusable agents', 'Sequencer and driver stimulus flow', 'Monitor and protocol observation', 'Scoreboard and checking infrastructure', 'Functional/code coverage and assertions', 'DUT interaction and regression analysis'],
    methodology: ['Plan — define verification objectives, interfaces and closure criteria', 'Develop — build reusable SystemVerilog/UVM environments and agents', 'Stimulate — generate controlled sequences and DUT interactions', 'Monitor — observe protocol activity and collect transaction data', 'Check — apply scoreboards, predictors, assertions and protocol checks', 'Measure — evaluate functional/code coverage and regression results', 'Close — analyze failures, debug issues and drive verification closure'],
    components: ['Drivers', 'Monitors', 'Sequencers', 'Scoreboards', 'Reusable agents', 'Coverage collectors', 'Assertions/checkers'],
  }),
  'pcie-5-data-link-layer-verification': makeDetail({
    slug: 'pcie-5-data-link-layer-verification', title: 'PCIe 5.0 Data Link Layer Verification', type: 'whitepaper', classification: 'Protocol Verification Reference',
    positioning: 'Verification methodology for PCIe 5.0 Data Link Layer behavior, including flow control, replay, acknowledgement handling, error scenarios and coverage.',
    context: ['Data Link Layer verification requires focused checking of transaction reliability, acknowledgement behavior, replay handling and flow-control conditions.', 'A structured environment combines stimulus, protocol checking, assertions and coverage to exercise normal and error conditions.'],
    architecture: ['PCIe transaction stimulus', 'Data Link Layer DUT', 'ACK/NAK checking', 'Replay-buffer checking', 'Credit/flow-control checking', 'Error injection and recovery', 'Coverage and regression analysis'],
    methodology: ['Plan — define Data Link Layer scenarios and closure criteria', 'Develop — establish reusable protocol stimulus and checking components', 'Stimulate — exercise ACK/NAK, replay and credit-flow scenarios', 'Check — apply protocol checks and SVA assertions', 'Inject — exercise defined error and recovery conditions', 'Measure — evaluate functional and code coverage', 'Close — analyze regression results and verification gaps'],
    components: ['PCIe stimulus', 'Protocol monitors', 'Replay checking', 'Flow-control checking', 'SVA assertions', 'Error injection', 'Coverage collectors'],
  }),
  'hbm4e-memory-subsystem-verification': makeDetail({
    slug: 'hbm4e-memory-subsystem-verification', title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper', classification: 'Memory Subsystem Verification Reference',
    positioning: 'Subsystem verification covering memory-controller behavior, PHY and training interactions, model integration, functional coverage and regression automation.',
    context: ['Memory subsystem verification spans controller behavior, PHY interaction, training sequences and integration with memory models.', 'Verification requires coordinated stimulus, checking, coverage and automated regression across subsystem interfaces and operating scenarios.'],
    architecture: ['Memory stimulus', 'Controller', 'PHY / training interface', 'Memory model integration', 'Protocol and data checking', 'Coverage collection', 'Regression analysis'],
    methodology: ['Plan — define subsystem scenarios and verification objectives', 'Integrate — connect controller, PHY and model components', 'Stimulate — exercise memory access and training scenarios', 'Check — validate control, data and interface behavior', 'Measure — collect functional and code coverage', 'Regress — automate scenario execution and failure capture', 'Close — analyze gaps and converge on closure criteria'],
    components: ['Controller environment', 'PHY interface monitors', 'Memory models', 'Scoreboards', 'Training checks', 'Coverage', 'Regression infrastructure'],
  }),
  'processor-based-verification-arm-cortex-m7': makeDetail({
    slug: 'processor-based-verification-arm-cortex-m7', title: 'Processor-Based Verification Using ARM Cortex-M7', type: 'whitepaper', classification: 'Processor-Driven Verification Reference',
    positioning: 'Software-driven verification using processor execution to validate memory access, register behavior, interrupts and subsystem initialization.',
    context: ['Processor-driven verification validates hardware behavior through software-visible interactions rather than relying only on directed HDL-level stimulus.', 'The approach is useful for exercising initialization, register access, memory behavior and interrupt-driven scenarios at subsystem level.'],
    architecture: ['Cortex-M7 processor model', 'Software test sequences', 'Memory/register interface', 'Subsystem DUT', 'Interrupt handling', 'Functional checking', 'Coverage and regression'],
    methodology: ['Plan — identify software-visible verification scenarios', 'Initialize — establish processor and subsystem state', 'Execute — run software-driven access and control sequences', 'Check — validate registers, memory and interrupt behavior', 'Observe — collect processor and DUT execution evidence', 'Measure — assess functional/code coverage', 'Close — debug failures and refine scenarios'],
    components: ['Processor model', 'Software tests', 'Register checking', 'Memory checking', 'Interrupt scenarios', 'Coverage', 'Regression/debug'],
  }),
  'formal-verification-cadence-jaspergold': makeDetail({
    slug: 'formal-verification-cadence-jaspergold', title: 'Formal Verification Planning with Cadence JasperGold', type: 'whitepaper', classification: 'Formal Verification Reference',
    positioning: 'Formal verification planning for structural logic such as crossbars, multiplexers, clock/reset behavior and overflow conditions, complementing simulation-based verification.',
    context: ['Formal methods can complement simulation by targeting structural properties and corner conditions that benefit from exhaustive or property-based analysis.', 'A planned formal flow identifies suitable properties, assumptions, proof objectives and integration points with the broader verification strategy.'],
    architecture: ['Design properties', 'Assumptions and constraints', 'Formal engine', 'Crossbar / mux logic', 'Clock and reset logic', 'Overflow / boundary properties', 'Proof analysis'],
    methodology: ['Plan — identify formal targets and proof objectives', 'Model — define properties, assumptions and constraints', 'Prove — execute formal analysis against selected logic', 'Analyze — inspect counterexamples and proof status', 'Refine — improve properties and constraints where required', 'Correlate — complement simulation-based verification', 'Close — document proof evidence and remaining verification gaps'],
    components: ['SVA properties', 'Assumptions', 'Constraints', 'Formal proofs', 'Counterexample analysis', 'Structural targets', 'Coverage/correlation'],
  }),
  '5g-radio-on-chip-functional-verification': makeDetail({
    slug: '5g-radio-on-chip-functional-verification', title: '5G Radio-on-Chip Functional Verification', type: 'case-study', classification: 'Subsystem Case Study',
    positioning: 'Subsystem verification methodology combining reusable UVM infrastructure, MATLAB correlation, processor-driven verification, datapath scoreboards and formal planning.',
    context: ['Radio-oriented SoC subsystems require coordinated verification of datapath behavior, software-visible control and algorithmic reference behavior.', 'A mixed methodology can combine reusable UVM infrastructure, reference-model correlation, scoreboarding and formal planning within one verification flow.'],
    architecture: ['UVM environment', 'Radio/datapath DUT', 'MATLAB/reference correlation', 'Processor-driven scenarios', 'Datapath scoreboards', 'Formal planning', 'Coverage and regression'],
    methodology: ['Plan — define subsystem behavior and verification objectives', 'Develop — build reusable UVM infrastructure', 'Correlate — compare implementation behavior with reference models', 'Stimulate — execute processor-driven and functional scenarios', 'Check — apply datapath scoreboards and assertions', 'Measure — collect coverage and regression evidence', 'Close — debug failures and refine verification scenarios'],
    components: ['UVM agents', 'Reference-model correlation', 'Processor-driven tests', 'Datapath scoreboards', 'Assertions', 'Coverage', 'Regression/debug'],
  }),
  'end-to-end-iot-soc-verification': makeDetail({
    slug: 'end-to-end-iot-soc-verification', title: 'End-to-End IoT SoC Verification', type: 'case-study', classification: 'SoC Verification Case Study',
    positioning: 'IP-to-SoC verification scope covering reusable environments, third-party IP integration, RTL verification, gate-level simulation and final verification sign-off.',
    context: ['End-to-end SoC verification must connect IP-level verification with subsystem integration and final system-level scenarios.', 'The flow requires consistent environments, third-party IP integration, RTL and gate-level verification, regression and evidence-based closure.'],
    architecture: ['Reusable IP environments', 'Third-party IP integration', 'Subsystem verification', 'SoC DUT', 'RTL verification', 'Gate-level simulation', 'Final sign-off evidence'],
    methodology: ['Plan — define IP-to-SoC verification objectives', 'Integrate — bring reusable and third-party IP environments together', 'Verify — execute block and subsystem scenarios', 'System-test — exercise integrated SoC behavior', 'GLS — validate selected gate-level scenarios', 'Regress — automate integrated verification', 'Close — consolidate evidence toward final sign-off readiness'],
    components: ['IP environments', 'Third-party IP models', 'SoC testbench', 'System-level scenarios', 'GLS infrastructure', 'Coverage', 'Regression/sign-off evidence'],
  }),
  'ufs-4-low-power-verification': makeDetail({
    slug: 'ufs-4-low-power-verification', title: 'UFS 4.0 Low-Power Verification', type: 'whitepaper', classification: 'Low-Power Verification Reference',
    positioning: 'Low-power verification covering PMU behavior, power-state transitions, clock gating, reset sequencing and UVM-based coverage closure.',
    context: ['Low-power interface verification requires checking state transitions, clock behavior, reset sequencing and power-management control across defined operating scenarios.', 'UVM-based stimulus and checking can be combined with coverage and regression to evaluate low-power behavior systematically.'],
    architecture: ['UFS stimulus', 'Power-management unit', 'Power-state transitions', 'Clock gating', 'Reset sequencing', 'Assertions/checking', 'Coverage and regression'],
    methodology: ['Plan — define low-power states and transition scenarios', 'Stimulate — exercise power-management sequences', 'Check — validate PMU and interface behavior', 'Transition — verify clock gating and state changes', 'Reset — validate reset sequencing and recovery', 'Measure — collect functional/code coverage', 'Close — debug regressions and converge on coverage goals'],
    components: ['UVM environment', 'PMU stimulus', 'Power-state monitors', 'Clock/reset checks', 'Assertions', 'Coverage', 'Regression/debug'],
  }),
};

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];