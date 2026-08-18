export const capabilityScenarios = {
  'rtl-design': [
    { situation: 'RTL capacity is constrained at block or subsystem level.', impact: 'Senior engineers are absorbed by schedule pressure and integration dependencies.', contribution: 'RTL design, interface integration, reusable blocks and implementation-aware design feedback.', engagement: 'Specialist Engineering' },
    { situation: 'A new subsystem must move from specification into implementation-ready RTL.', impact: 'Architecture intent, interfaces and PPA requirements must be translated without delaying verification.', contribution: 'Specification-to-RTL implementation with verification handoff and PPA feedback.', engagement: 'Managed Workstream' },
    { situation: 'Multiple RTL workstreams need scalable execution.', impact: 'Parallel blocks increase coordination and review load.', contribution: 'Dedicated RTL engineering capacity aligned to the program roadmap.', engagement: 'Dedicated Engineering ODC' },
  ],
  'design-verification': [
    { situation: 'Verification capacity is constraining a block, subsystem or SoC milestone.', impact: 'Regression, debug and coverage closure compete for limited senior engineering capacity.', contribution: 'SystemVerilog/UVM environments, stimulus, checking, coverage, debug and closure.', engagement: 'Specialist Engineering' },
    { situation: 'Verification closure is becoming a schedule risk.', impact: 'Coverage gaps, regression backlog and debug demand can delay sign-off.', contribution: 'Defined verification workstreams from stimulus and checking through coverage and closure.', engagement: 'Managed Workstream' },
    { situation: 'Multiple programs require scalable verification execution.', impact: 'Hiring and coordinating teams across programs creates management overhead.', contribution: 'Dedicated verification engineering aligned to methodology and roadmap.', engagement: 'Dedicated Engineering ODC' },
  ],
  'physical-design': [
    { situation: 'Timing or congestion closure is constraining implementation.', impact: 'Late-stage ECOs and physical interactions threaten milestones.', contribution: 'Floorplanning, placement, CTS, routing, timing and congestion closure.', engagement: 'Managed Workstream' },
    { situation: 'Advanced-node implementation needs additional physical-design capacity.', impact: 'Internal teams are overloaded across implementation and sign-off.', contribution: 'Specialist physical implementation and sign-off engineering.', engagement: 'Specialist Engineering' },
    { situation: 'Several programs require sustained backend execution capacity.', impact: 'Scaling internal teams increases coordination and hiring overhead.', contribution: 'Dedicated Physical Design engineering ODC aligned to the customer roadmap.', engagement: 'Dedicated Engineering ODC' },
  ],
  'dft': [
    { situation: 'DFT readiness is becoming a silicon schedule constraint.', impact: 'Scan, ATPG and coverage closure must progress alongside implementation.', contribution: 'Test architecture, scan, ATPG and DFT sign-off support.', engagement: 'Specialist Engineering' },
    { situation: 'DFT workstreams need defined execution and closure ownership.', impact: 'Pattern generation, debug and sign-off activities compete with core design milestones.', contribution: 'Managed DFT workstream from planning through sign-off.', engagement: 'Managed Workstream' },
    { situation: 'Multiple silicon programs need scalable DFT execution.', impact: 'Program teams need repeatable methodology and capacity.', contribution: 'Dedicated DFT engineering aligned to the product roadmap.', engagement: 'Dedicated Engineering ODC' },
  ],
  'soc-ip': [
    { situation: 'IP integration or subsystem development is consuming core SoC bandwidth.', impact: 'Integration dependencies and interface issues slow system progress.', contribution: 'IP integration, subsystem development and SoC integration engineering.', engagement: 'Specialist Engineering' },
    { situation: 'A defined subsystem needs execution through integration milestones.', impact: 'Internal teams need an external workstream without losing architectural control.', contribution: 'Managed subsystem or IP engineering workstream with milestone ownership.', engagement: 'Managed Workstream' },
    { situation: 'Multiple IP and SoC programs require sustained external engineering.', impact: 'Scaling execution across programs becomes a management challenge.', contribution: 'Dedicated IP / SoC engineering organization aligned to roadmap and governance.', engagement: 'Dedicated Engineering ODC' },
  ],
};
