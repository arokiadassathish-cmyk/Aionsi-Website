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
    positioning: 'Reusable SystemVerilog/UVM verification architecture for scalable block, subsystem and SoC verification.',
    context: [
      'The methodology is centered on reusable verification environments that support stimulus generation, DUT interaction, monitoring, checking, coverage and analysis.',
      'The architecture is intended to scale across interface, subsystem and SoC verification programs while preserving reuse and verification consistency.',
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
      'SystemVerilog/UVM-based reusable verification environment development',
      'Stimulus generation and controlled DUT interaction',
      'Monitoring, checking and scoreboard-based result analysis',
      'Functional and code coverage strategy',
      'Assertion-based verification using SVA',
      'Regression, debug, logging and reporting workflows',
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
