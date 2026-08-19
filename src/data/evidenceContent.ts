export interface EvidencePresentation {
  contextTitle: string;
  architectureLabel: string;
  architectureSummary: string;
  architectureBenefits: Array<{ title: string; description: string }>;
  methodologyLabel: string;
  methodologyStages: string[];
  assetsLabel: string;
  contributionTitle: string;
  contributionSummary: string;
  contributionItems: Array<{ title: string; description: string }>;
  scaleTitle: string;
  scaleSummary: string;
  scaleItems: Array<{ value: string; title: string; description: string }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export const evidencePresentation: Record<string, EvidencePresentation> = {
  'Design Verification': {
    contextTitle: 'Why reusable verification matters.', architectureLabel: 'Verification architecture', architectureSummary: 'The architecture connects reusable verification infrastructure to execution, checking and verification-closure workflows.',
    architectureBenefits: [
      { title: 'Accelerate environment development', description: 'Reusable infrastructure reduces repeated environment development across interfaces, blocks and SoC-level programs.' },
      { title: 'Increase verification reuse', description: 'Common agents, sequences, monitors and checkers can be extended across verification programs while preserving consistent patterns.' },
      { title: 'Improve verification closure', description: 'Coverage, assertions, scoreboards and regression analysis support structured closure activities.' },
      { title: 'Scale engineering capacity', description: 'AionSi engineers can extend an established verification organization as an integrated engineering workstream.' },
    ], methodologyLabel: 'Verification methodology', methodologyStages: ['Plan', 'Develop', 'Stimulate', 'Monitor', 'Check', 'Measure', 'Close'], assetsLabel: 'Reusable verification assets',
    contributionTitle: 'Verification execution where engineering capacity matters.', contributionSummary: 'AionSi can contribute within an existing verification program or as a dedicated engineering workstream.',
    contributionItems: [
      { title: 'Environment development', description: 'Build or extend UVM environments, agents, drivers, monitors and infrastructure around defined verification requirements.' },
      { title: 'Protocol verification', description: 'Execute interface-level verification using drivers, monitors, checkers and coverage aligned to defined protocol requirements.' },
      { title: 'Verification closure', description: 'Support coverage, assertions, scoreboard analysis, debug and regression closure activities.' },
      { title: 'Managed verification workstream', description: 'Align an AionSi engineering team around defined scope, deliverables, milestones and customer verification workflows.' },
    ],
    scaleTitle: 'Engineering capacity designed to integrate.', scaleSummary: 'AionSi can extend established verification organizations through defined engineering workstreams and scalable delivery models.', scaleItems: [
      { value: '135+', title: 'DV engineers', description: 'SystemVerilog/UVM verification capability across major interface and SoC verification domains.' },
      { value: 'ODC', title: 'Dedicated delivery', description: 'Dedicated engineering teams aligned to customer scope, milestones and workflows.' },
      { value: 'E2E', title: 'Closure support', description: 'Coverage, debug, regression and sign-off activities within defined verification ownership.' },
      { value: 'Scale', title: 'Flexible capacity', description: 'Specialist, managed-workstream and dedicated-team engagement options.' },
    ], ctaTitle: 'Have a verification workstream to accelerate?', ctaDescription: 'Bring an interface, block, subsystem or SoC verification requirement. We can connect it to the appropriate AionSi engineering team around defined scope, milestones and deliverables.', ctaButton: 'Discuss a Verification Workstream',
  },
  'Physical Design': {
    contextTitle: 'Why disciplined physical implementation matters.', architectureLabel: 'Physical implementation architecture', architectureSummary: 'The implementation path connects netlist handoff to floorplanning, placement, CTS, routing, timing closure, physical verification and sign-off.',
    architectureBenefits: [
      { title: 'Accelerate implementation convergence', description: 'Structured floorplanning, placement, CTS and routing iterations help identify physical constraints early and reduce downstream rework.' },
      { title: 'Improve PPA and congestion trade-offs', description: 'Implementation decisions are evaluated against area, power, timing and congestion objectives throughout closure.' },
      { title: 'Drive timing closure', description: 'Static timing analysis, clock-tree refinement and implementation feedback support systematic setup, hold and path-closure activities.' },
      { title: 'Support sign-off readiness', description: 'Physical verification, ECO iteration and downstream checks provide a structured path toward implementation release and sign-off readiness.' },
    ], methodologyLabel: 'Physical implementation methodology', methodologyStages: ['Planning', 'Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing Closure', 'Sign-off'], assetsLabel: 'Physical design engineering assets',
    contributionTitle: 'Physical implementation where closure pressure is highest.', contributionSummary: 'AionSi can contribute to defined implementation bottlenecks or operate as an integrated physical design workstream.', contributionItems: [
      { title: 'Floorplanning and placement', description: 'Translate hierarchy, macro, power-domain and physical constraints into implementation-ready planning and placement decisions.' },
      { title: 'CTS and routing closure', description: 'Support clock implementation, skew/latency objectives, routing convergence, congestion management and downstream timing closure.' },
      { title: 'Timing and physical verification', description: 'Work through STA, physical-rule checks, ECO iterations and sign-off readiness activities.' },
      { title: 'Dedicated Physical Design workstream', description: 'Align engineering capacity to defined scope, milestones, closure objectives and customer implementation workflows.' },
    ], scaleTitle: 'Engineering capacity designed for closure.', scaleSummary: 'Physical Design work can begin with a specialist bottleneck, expand into a managed workstream or operate as a dedicated engineering ODC.', scaleItems: [
      { value: 'Specialist', title: 'Targeted engineering', description: 'Focused capacity for a defined implementation or closure constraint.' },
      { value: 'Managed', title: 'Managed workstream', description: 'Defined implementation ownership with milestones and closure objectives.' },
      { value: 'ODC', title: 'Dedicated engineering', description: 'A dedicated team aligned to the customer roadmap and scalable Physical Design demand.' },
      { value: 'Sign-off', title: 'Closure-oriented delivery', description: 'Execution aligned to timing, congestion, physical verification and release readiness.' },
    ], ctaTitle: 'Have a Physical Design workstream to accelerate?', ctaDescription: 'Bring the implementation stage, timing or congestion constraint, physical verification issue or capacity requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a Physical Design Workstream',
  },
  'DFT': {
    contextTitle: 'Why disciplined test engineering matters.', architectureLabel: 'DFT implementation architecture', architectureSummary: 'The DFT path connects test architecture and scan insertion to ATPG, fault coverage, gate-level validation and sign-off.',
    architectureBenefits: [
      { title: 'Improve test controllability', description: 'Structured scan and test architecture supports observability and controllability objectives across the design.' },
      { title: 'Drive ATPG efficiency', description: 'Pattern generation and fault analysis provide a measurable path toward manufacturing-test readiness.' },
      { title: 'Strengthen downstream validation', description: 'Gate-level and boundary-scan checks help validate the implemented DFT structures before release.' },
      { title: 'Support sign-off discipline', description: 'DFT closure activities align scan, ATPG, coverage, CTL and sign-off checks around defined release criteria.' },
    ], methodologyLabel: 'DFT sign-off methodology', methodologyStages: ['Plan', 'Insert', 'Debug', 'ATPG', 'Fault analysis', 'Gate-level', 'Sign-off'], assetsLabel: 'DFT engineering assets',
    contributionTitle: 'DFT engineering where manufacturing readiness matters.', contributionSummary: 'AionSi can support focused DFT activities or a defined DFT workstream within the broader silicon program.', contributionItems: [
      { title: 'Scan architecture and debug', description: 'Support scan-chain planning, insertion and debug around defined controllability and observability requirements.' },
      { title: 'ATPG and fault coverage', description: 'Generate and analyze ATPG patterns and fault coverage as defined by the approved DFT scope.' },
      { title: 'Gate-level validation', description: 'Use gate-level checks to validate test logic behavior across downstream implementation stages.' },
      { title: 'Boundary scan / CTL and sign-off', description: 'Support IEEE 1149.x-related activities, CTL generation and DFT sign-off readiness.' },
    ], scaleTitle: 'Engineering capacity designed for DFT closure.', scaleSummary: 'DFT work can begin with a defined sign-off bottleneck and expand into managed ownership aligned to the silicon release plan.', scaleItems: [
      { value: 'Scan', title: 'Test architecture', description: 'Focused engineering around scan and test-structure implementation.' },
      { value: 'ATPG', title: 'Pattern engineering', description: 'Targeted ATPG and fault-analysis activities around defined coverage goals.' },
      { value: 'GLS', title: 'Downstream validation', description: 'Gate-level validation supporting DFT implementation confidence.' },
      { value: 'Sign-off', title: 'Release readiness', description: 'Structured DFT closure and handoff aligned to manufacturing test objectives.' },
    ], ctaTitle: 'Have a DFT workstream to accelerate?', ctaDescription: 'Bring the scan, ATPG, fault-coverage or DFT sign-off requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a DFT Workstream',
  },
  'Protocol Verification': {
    contextTitle: 'Why protocol-level confidence matters.', architectureLabel: 'Protocol verification architecture', architectureSummary: 'The verification path connects interface stimulus and protocol behavior to checking, error scenarios, coverage and closure.', architectureBenefits: [
      { title: 'Accelerate interface bring-up', description: 'Reusable protocol-aware environments reduce repeated setup across interfaces, blocks and subsystem programs.' },
      { title: 'Expose corner cases early', description: 'Targeted stimulus, monitoring and error scenarios focus verification on protocol behavior under constrained conditions.' },
      { title: 'Strengthen protocol confidence', description: 'Assertions, scoreboards, protocol monitors and coverage support structured interface verification closure.' },
      { title: 'Scale verification capacity', description: 'AionSi can extend an established verification organization through focused protocol workstreams.' },
    ], methodologyLabel: 'Protocol verification methodology', methodologyStages: ['Plan', 'Stimulate', 'Monitor', 'Check', 'Inject Errors', 'Measure', 'Close'], assetsLabel: 'Protocol verification assets', contributionTitle: 'Protocol verification at the interface boundary.', contributionSummary: 'AionSi can contribute to protocol stimulus, checking, coverage and closure for defined interface requirements.', contributionItems: [
      { title: 'Interface stimulus', description: 'Develop targeted stimulus and sequences around defined protocol requirements and transaction behavior.' },
      { title: 'Protocol checking', description: 'Use monitors, scoreboards, assertions and protocol-aware checks to validate expected behavior.' },
      { title: 'Error and corner-case verification', description: 'Exercise replay, flow-control, reset, error-injection and boundary conditions where defined by scope.' },
      { title: 'Managed protocol workstream', description: 'Align engineers around interface scope, milestones, coverage objectives and closure deliverables.' },
    ], scaleTitle: 'Protocol engineering capacity designed to integrate.', scaleSummary: 'AionSi supports targeted protocol workstreams, managed verification scope and dedicated teams aligned to customer interface roadmaps.', scaleItems: [
      { value: 'PCIe', title: 'High-speed interfaces', description: 'Protocol-focused verification around defined PCIe behavior and data-link requirements.' },
      { value: 'DDR/HBM', title: 'Memory interfaces', description: 'Verification support around controller, PHY, training and subsystem interactions.' },
      { value: 'USB/AMBA', title: 'System interfaces', description: 'Reusable protocol-aware verification patterns for defined interface requirements.' },
      { value: 'ODC', title: 'Dedicated capacity', description: 'Engineering teams aligned to protocol scope, milestones and verification closure.' },
    ], ctaTitle: 'Have a protocol verification workstream to accelerate?', ctaDescription: 'Bring a PCIe, USB, DDR, HBM, AMBA or other interface verification requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a Protocol Workstream',
  },
  'SoC & IP Engineering': {
    contextTitle: 'Why disciplined SoC integration matters.', architectureLabel: 'SoC and IP engineering architecture', architectureSummary: 'The SoC path connects IP blocks and subsystems through interconnect, control, verification and system-level integration toward release readiness.', architectureBenefits: [
      { title: 'Integrate IP with intent', description: 'Structured subsystem integration preserves interface contracts, address maps, reset behavior and control ownership.' },
      { title: 'Accelerate SoC bring-up', description: 'System-level verification connects firmware, interconnect, peripherals and integrated IP under realistic execution flows.' },
      { title: 'Improve hardware-software confidence', description: 'Processor-driven and self-checking verification exposes integration issues that isolated block verification can miss.' },
      { title: 'Scale engineering ownership', description: 'AionSi can extend from defined IP integration tasks into subsystem and SoC workstreams.' },
    ], methodologyLabel: 'SoC / IP integration methodology', methodologyStages: ['Architect', 'Integrate IP', 'Connect', 'Verify', 'Debug', 'Validate', 'Release'], assetsLabel: 'SoC and IP engineering assets', contributionTitle: 'SoC integration where system complexity is highest.', contributionSummary: 'AionSi can contribute at IP, subsystem or SoC level with engineering ownership matched to the integration problem.', contributionItems: [
      { title: 'IP integration', description: 'Integrate reusable IP blocks, interfaces, register maps and system-level dependencies into defined subsystems.' },
      { title: 'Subsystem development', description: 'Develop and validate peripheral, bus and control subsystems around clear architecture and interface ownership.' },
      { title: 'SoC verification and bring-up', description: 'Execute system-level verification using software, scoreboards, protocol partners and regression workflows where defined.' },
      { title: 'Dedicated SoC / IP workstream', description: 'Provide engineers aligned to milestones, integration ownership and the customer SoC roadmap.' },
    ], scaleTitle: 'Engineering capacity designed around silicon programs.', scaleSummary: 'SoC and IP work can scale from a focused integration task to a dedicated engineering team aligned with the customer roadmap.', scaleItems: [
      { value: 'IP', title: 'Integration engineering', description: 'Focused integration of IP and interface blocks into defined subsystems.' },
      { value: 'Subsystem', title: 'System construction', description: 'Engineering ownership across bus, peripheral and control integration.' },
      { value: 'SoC', title: 'System verification', description: 'Software-driven and system-level verification around integrated behavior.' },
      { value: 'ODC', title: 'Dedicated delivery', description: 'Scalable engineering teams aligned to SoC roadmap and closure milestones.' },
    ], ctaTitle: 'Have a SoC or IP workstream to accelerate?', ctaDescription: 'Bring an IP integration, subsystem or SoC engineering requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a SoC / IP Workstream',
  },
};

export const getEvidencePresentation = (capability: string): EvidencePresentation => evidencePresentation[capability] ?? evidencePresentation['Design Verification'];
