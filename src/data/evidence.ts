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

export const evidenceDetails: Record<string, EvidenceDetail> = {
  'reusable-uvm-verification-architecture': {
    slug: 'reusable-uvm-verification-architecture',
    title: 'Reusable UVM Verification Architecture',
    type: 'whitepaper',
    capability: 'Design Verification',
    revision: '1.0',
    classification: 'Technical Reference Architecture',
    positioning:
      'Reusable SystemVerilog/UVM verification architecture designed to accelerate block, subsystem and SoC verification while improving reuse, coverage and verification closure.',
    context: [
      'Verification programs become more complex as interfaces, blocks and SoCs scale. Reusable verification infrastructure helps reduce repeated environment development and maintain consistent execution patterns.',
      'The architecture is intended to scale across interface, subsystem and SoC verification programs while connecting stimulus, checking, coverage and analysis into a structured verification-closure workflow.',
    ],
    architecture: [
      'Test and sequence layer',
      'Environment and reusable agents',
      'Sequencer and driver stimulus flow',
      'Monitor and protocol observation',
      'Scoreboard and checking infrastructure',
      'Functional/code coverage and assertions',
      'DUT interaction and regression analysis',
    ],
    methodology: [
      'Plan — define verification objectives, interfaces and closure criteria',
      'Develop — build reusable SystemVerilog/UVM environments and agents',
      'Stimulate — generate controlled sequences and DUT interactions',
      'Monitor — observe protocol activity and collect transaction data',
      'Check — apply scoreboards, predictors, assertions and protocol checks',
      'Measure — evaluate functional/code coverage and regression results',
      'Close — analyze failures, debug issues and drive verification closure',
    ],
    components: [
      'Drivers',
      'Monitors',
      'Sequencers',
      'Scoreboards',
      'Reusable agents',
      'Coverage collectors',
      'Assertions/checkers',
    ],
    evidenceNotes: [
      'The reference material supports the reusable UVM architecture, component responsibilities and verification methodology presented here.',
      'This page provides an engineering summary; the detailed whitepaper provides deeper technical context and methodology.',
    ],
    sourceLabel: 'AionSi Engineering White Paper — Reusable UVM Verification Architecture',
  },
  'pcie-5-data-link-layer-verification': {
    slug: 'pcie-5-data-link-layer-verification',
    title: 'PCIe 5.0 Data Link Layer Verification',
    type: 'whitepaper',
    capability: 'Protocol Verification',
    revision: '1.0',
    classification: 'Protocol Verification Technical Reference',
    positioning:
      'PCIe data-link verification covering ACK/NAK handling, replay behavior, credit-based flow control, protocol monitoring, error injection and coverage.',
    context: [
      'The approved capability material identifies PCIe data-link verification as a protocol-specific verification scope.',
      'The verification focus covers protocol behavior, monitoring, error injection and coverage within the defined data-link scope.',
    ],
    architecture: [
      'PCIe data-link protocol stimulus',
      'ACK/NAK handling',
      'Replay behavior',
      'Credit-based flow control',
      'Protocol monitoring',
      'Error injection',
      'Coverage analysis',
    ],
    methodology: [
      'Define the data-link verification scope and protocol scenarios',
      'Exercise ACK/NAK and replay behavior',
      'Verify credit-based flow-control behavior',
      'Monitor protocol transactions and inject defined errors',
      'Measure verification coverage and analyze closure results',
    ],
    components: [
      'Protocol stimulus',
      'Protocol monitor',
      'ACK/NAK checking',
      'Replay behavior checking',
      'Flow-control checking',
      'Error injection',
      'Coverage',
    ],
    evidenceNotes: [
      'This page is a technical summary of the approved PCIe data-link verification scope represented in the AionSi capability material.',
      'No additional performance or customer claims are introduced beyond the represented technical scope.',
    ],
    sourceLabel: 'AionSi Engineering White Paper — PCIe 5.0 Data Link Layer Verification',
  },
  'ufs-4-low-power-verification': {
    slug: 'ufs-4-low-power-verification',
    title: 'UFS 4.0 Low-Power Verification',
    type: 'whitepaper',
    capability: 'Protocol Verification',
    revision: '1.0',
    classification: 'Low-Power Verification Technical Reference',
    positioning:
      'UFS verification covering PMU behavior, power-state transitions, clock/reset control, wake-up behavior, assertions and coverage closure.',
    context: [
      'The approved capability material identifies UFS verification as a low-power and protocol-oriented verification scope.',
      'The represented scope connects PMU behavior, power-state transitions, clock/reset control and wake-up behavior to assertions and coverage closure.',
    ],
    architecture: [
      'PMU behavior',
      'Power-state transitions',
      'Clock/reset control',
      'Wake-up behavior',
      'Assertions',
      'Coverage analysis',
    ],
    methodology: [
      'Define power-state and wake-up verification scenarios',
      'Exercise PMU and power-state transitions',
      'Check clock and reset behavior',
      'Apply assertions to defined low-power behaviors',
      'Measure coverage and drive closure analysis',
    ],
    components: [
      'PMU checks',
      'Power-state scenarios',
      'Clock/reset checks',
      'Wake-up checks',
      'Assertions',
      'Coverage',
    ],
    evidenceNotes: [
      'This page summarizes the UFS low-power verification scope represented in the approved AionSi capability material.',
      'No additional customer, performance or silicon claims are introduced.',
    ],
    sourceLabel: 'AionSi Engineering White Paper — UFS 4.0 Low-Power Verification',
  },
  'hbm4e-memory-subsystem-verification': {
    slug: 'hbm4e-memory-subsystem-verification',
    title: 'HBM4e Memory Subsystem Verification',
    type: 'whitepaper',
    capability: 'Protocol Verification',
    revision: '1.0',
    classification: 'Memory Subsystem Verification Technical Reference',
    positioning:
      'Memory-subsystem verification covering interface behavior, training and calibration-oriented checking, functional coverage and regression analysis.',
    context: [
      'The approved capability material identifies HBM4e memory-subsystem verification as a scope covering interface behavior and training/calibration-oriented checking.',
      'The represented scope connects functional coverage and regression analysis to memory-subsystem verification closure.',
    ],
    architecture: [
      'Memory interface behavior',
      'Training-oriented checking',
      'Calibration-oriented checking',
      'Functional coverage',
      'Regression analysis',
    ],
    methodology: [
      'Define memory-subsystem interface scenarios',
      'Exercise interface behavior and training flows',
      'Apply calibration-oriented checks',
      'Measure functional coverage',
      'Analyze regression results and closure status',
    ],
    components: [
      'Interface stimulus',
      'Training checks',
      'Calibration checks',
      'Functional coverage',
      'Regression analysis',
    ],
    evidenceNotes: [
      'This page summarizes the HBM4e memory-subsystem verification scope represented in the approved AionSi capability material.',
      'No additional customer, performance or silicon claims are introduced.',
    ],
    sourceLabel: 'AionSi Engineering White Paper — HBM4e Memory Subsystem Verification',
  },
};

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];