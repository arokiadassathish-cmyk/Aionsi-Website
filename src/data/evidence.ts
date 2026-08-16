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
};

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
