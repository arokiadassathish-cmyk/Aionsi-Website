export interface ConversionScenario {
  id: string;
  situation: string;
  impact: string;
  whyAionSi: string;
  capability: string;
  evidence: string[];
  workstream: string;
  engagement: string;
  expansion: string;
  cta: string;
}

export const protocolConversionScenarios: ConversionScenario[] = [
  {
    id: 'capacity',
    situation: 'Your verification team needs additional experienced protocol engineers to meet program milestones.',
    impact: 'Ramp pressure can consume senior engineers and put verification milestones at risk.',
    whyAionSi: 'Protocol-focused verification engineering backed by reusable SystemVerilog/UVM infrastructure and structured closure practices.',
    capability: 'Protocol verification engineering capacity across high-speed interfaces and memory technologies.',
    evidence: ['Reusable UVM Verification Architecture', 'Protocol verification methodology'],
    workstream: 'Add protocol specialists to an existing customer-owned verification team.',
    engagement: 'Specialist Engineering',
    expansion: 'Specialist capacity → managed protocol workstream → broader verification team.',
    cta: 'Discuss Your Verification Requirement',
  },
  {
    id: 'closure',
    situation: 'Verification closure is becoming a schedule constraint.',
    impact: 'Regression backlog, coverage gaps and debug demand can delay milestone closure.',
    whyAionSi: 'Structured stimulus, checking, coverage and regression workflows that can be applied to a defined verification scope.',
    capability: 'Managed protocol verification and verification-closure execution.',
    evidence: ['Reusable UVM Verification Architecture', 'Verification methodology'],
    workstream: 'Own a defined verification scope from stimulus and checking through coverage and closure objectives.',
    engagement: 'Managed Workstream',
    expansion: 'Managed closure workstream → adjacent protocol/subsystem scope → multiple workstreams.',
    cta: 'Discuss Your Verification Requirement',
  },
  {
    id: 'new-protocol',
    situation: 'A new high-speed protocol or interface needs to be brought into verification.',
    impact: 'A new environment, scenarios, checkers and coverage model must be established without slowing the wider program.',
    whyAionSi: 'Reusable protocol-aware UVM patterns can accelerate environment creation while preserving structured verification and evidence boundaries.',
    capability: 'Protocol-specific verification environment, stimulus, monitoring, checking and closure planning.',
    evidence: ['Approved protocol-specific evidence where available', 'Reusable UVM Verification Architecture'],
    workstream: 'Define protocol scope, build/extend the environment, develop scenarios and checks, then drive coverage and regression.',
    engagement: 'Project / Turnkey',
    expansion: 'Protocol project → managed verification support → recurring protocol/program scope.',
    cta: 'Discuss Your Verification Requirement',
  },
  {
    id: 'reuse',
    situation: 'Existing verification environments are being repeatedly rebuilt across programs.',
    impact: 'Engineering effort is duplicated and reusable infrastructure is under-leveraged.',
    whyAionSi: 'Reusable sequencers, drivers/BFMs, monitors, scoreboards, predictors, assertions and coverage can establish consistent verification patterns.',
    capability: 'Reusable UVM verification infrastructure and migration/extension support.',
    evidence: ['Reusable UVM Verification Architecture'],
    workstream: 'Create, modernize or extend reusable verification infrastructure and apply it across defined interfaces or programs.',
    engagement: 'Managed Workstream / Project',
    expansion: 'Infrastructure workstream → additional interfaces → multi-program reuse.',
    cta: 'Discuss Your Verification Requirement',
  },
  {
    id: 'expertise',
    situation: 'The program needs protocol-specific expertise that is not readily available internally.',
    impact: 'Specialist knowledge gaps can slow environment development, debug and closure.',
    whyAionSi: 'Protocol-focused engineering scope covering PCIe, USB, DDR/LPDDR, HBM, AMBA/AXI and adjacent areas represented in approved material.',
    capability: 'Targeted protocol engineering expertise and specialist verification support.',
    evidence: ['Approved protocol evidence', 'Reusable UVM Verification Architecture'],
    workstream: 'Embed targeted protocol specialists into an existing verification organization.',
    engagement: 'Specialist Engineering',
    expansion: 'Specialist expertise → defined workstream → broader protocol verification team.',
    cta: 'Discuss Your Verification Requirement',
  },
  {
    id: 'scale',
    situation: 'Multiple verification programs require scalable external engineering capacity.',
    impact: 'Hiring, onboarding and coordinating multiple workstreams can create management overhead and uneven execution.',
    whyAionSi: 'A reusable verification methodology can support common engineering practices, governance and scalable team structures.',
    capability: 'Dedicated verification engineering organization aligned to customer roadmap, methodology and governance.',
    evidence: ['Reusable UVM Verification Architecture', 'Approved evidence set'],
    workstream: 'Build and operate a dedicated verification engineering team across multiple related workstreams.',
    engagement: 'Dedicated Engineering ODC',
    expansion: 'ODC pilot → core team → multiple programs → broader engineering organization.',
    cta: 'Discuss Your Verification Requirement',
  },
];
