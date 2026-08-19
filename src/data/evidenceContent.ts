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
    ],
    methodologyLabel: 'Verification methodology', methodologyStages: ['Plan', 'Develop', 'Stimulate', 'Monitor', 'Check', 'Measure', 'Close'], assetsLabel: 'Reusable verification assets',
    contributionTitle: 'Verification execution where engineering capacity matters.', contributionSummary: 'AionSi can contribute within an existing verification program or as a dedicated engineering workstream.',
    contributionItems: [
      { title: 'Environment development', description: 'Build or extend UVM environments, agents, drivers, monitors and infrastructure around defined verification requirements.' },
      { title: 'Protocol verification', description: 'Execute interface-level verification using drivers, monitors, checkers and coverage aligned to defined protocol requirements.' },
      { title: 'Verification closure', description: 'Support coverage, assertions, scoreboard analysis, debug and regression closure activities.' },
      { title: 'Managed verification workstream', description: 'Align an AionSi engineering team around defined scope, deliverables, milestones and customer verification workflows.' },
    ],
    scaleTitle: 'Engineering capacity designed to integrate.', scaleSummary: 'AionSi can extend established verification organizations through defined engineering workstreams and scalable delivery models.',
    scaleItems: [
      { value: '135+', title: 'DV engineers', description: 'SystemVerilog/UVM verification capability across major interface and SoC verification domains.' },
      { value: 'ODC', title: 'Dedicated delivery', description: 'Dedicated engineering teams aligned to customer scope, milestones and workflows.' },
      { value: 'E2E', title: 'Closure support', description: 'Coverage, debug, regression and sign-off activities within defined verification ownership.' },
      { value: 'Scale', title: 'Flexible capacity', description: 'Specialist, managed-workstream and dedicated-team engagement options.' },
    ],
    ctaTitle: 'Have a verification workstream to accelerate?', ctaDescription: 'Bring an interface, block, subsystem or SoC verification requirement. We can connect it to the appropriate AionSi engineering team around defined scope, milestones and deliverables.', ctaButton: 'Discuss a Verification Workstream',
  },
  'Physical Design': {
    contextTitle: 'Why disciplined physical implementation matters.', architectureLabel: 'Physical implementation architecture', architectureSummary: 'The implementation path connects netlist handoff to floorplanning, placement, CTS, routing, timing closure, physical verification and sign-off.',
    architectureBenefits: [
      { title: 'Accelerate implementation convergence', description: 'Structured floorplanning, placement, CTS and routing iterations help identify physical constraints early and reduce downstream rework.' },
      { title: 'Improve PPA and congestion trade-offs', description: 'Implementation decisions are evaluated against area, power, timing and congestion objectives throughout closure.' },
      { title: 'Drive timing closure', description: 'Static timing analysis, clock-tree refinement and implementation feedback support systematic setup, hold and path-closure activities.' },
      { title: 'Support sign-off readiness', description: 'Physical verification, ECO iteration and downstream checks provide a structured path toward implementation release and sign-off readiness.' },
    ],
    methodologyLabel: 'Physical implementation methodology', methodologyStages: ['Planning', 'Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing Closure', 'Sign-off'], assetsLabel: 'Physical design engineering assets',
    contributionTitle: 'Physical implementation where closure pressure is highest.', contributionSummary: 'AionSi can contribute to defined implementation bottlenecks or operate as an integrated physical design workstream.',
    contributionItems: [
      { title: 'Floorplanning and placement', description: 'Translate hierarchy, macro, power-domain and physical constraints into implementation-ready planning and placement decisions.' },
      { title: 'CTS and routing closure', description: 'Support clock implementation, skew/latency objectives, routing convergence, congestion management and downstream timing closure.' },
      { title: 'Timing and physical verification', description: 'Work through STA, physical-rule checks, ECO iterations and sign-off readiness activities.' },
      { title: 'Dedicated Physical Design workstream', description: 'Align engineering capacity to defined scope, milestones, closure objectives and customer implementation workflows.' },
    ],
    scaleTitle: 'Engineering capacity designed for closure.', scaleSummary: 'Physical Design work can begin with a specialist bottleneck, expand into a managed workstream or operate as a dedicated engineering ODC.',
    scaleItems: [
      { value: 'Specialist', title: 'Targeted engineering', description: 'Focused capacity for a defined implementation or closure constraint.' },
      { value: 'Managed', title: 'Managed workstream', description: 'Defined implementation ownership with milestones and closure objectives.' },
      { value: 'ODC', title: 'Dedicated engineering', description: 'A dedicated team aligned to the customer roadmap and scalable Physical Design demand.' },
      { value: 'Sign-off', title: 'Closure-oriented delivery', description: 'Execution aligned to timing, congestion, physical verification and release readiness.' },
    ],
    ctaTitle: 'Have a Physical Design workstream to accelerate?', ctaDescription: 'Bring the implementation stage, timing or congestion constraint, physical verification issue or capacity requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a Physical Design Workstream',
  },
  'DFT': {
    contextTitle: 'Why DFT sign-off discipline matters.', architectureLabel: 'DFT sign-off architecture', architectureSummary: 'The DFT path connects test architecture and scan implementation to ATPG, fault coverage, gate-level validation, boundary scan and sign-off.',
    architectureBenefits: [
      { title: 'Structure test readiness', description: 'A defined DFT flow connects scan, ATPG and downstream validation activities to manufacturing-test objectives.' },
      { title: 'Improve debug visibility', description: 'Scan-chain debugging and gate-level validation provide structured checkpoints before sign-off.' },
      { title: 'Close fault coverage systematically', description: 'ATPG generation and fault-coverage analysis provide measurable closure activities within the stated methodology.' },
      { title: 'Support mixed-signal integration', description: 'Boundary scan and CTL-related activities support DFT integration around mixed-signal IP requirements.' },
    ],
    methodologyLabel: 'DFT sign-off methodology', methodologyStages: ['Plan', 'Scan', 'ATPG', 'Coverage', 'GLS', 'Boundary Scan', 'Sign-off'], assetsLabel: 'DFT engineering assets',
    contributionTitle: 'DFT execution from architecture through sign-off.', contributionSummary: 'AionSi can contribute to defined DFT activities from scan and ATPG through coverage analysis and sign-off readiness.',
    contributionItems: [
      { title: 'Scan and chain debug', description: 'Support scan-chain implementation, structural checks and debugging within the defined DFT methodology.' },
      { title: 'ATPG and fault coverage', description: 'Generate and analyze ATPG patterns and fault coverage against the stated sign-off objectives.' },
      { title: 'Gate-level validation', description: 'Use Gate-Level Simulation as a downstream validation stage within the DFT closure flow.' },
      { title: 'Boundary scan and CTL', description: 'Support IEEE 1149.x boundary-scan and CTL generation activities described in the methodology.' },
    ],
    scaleTitle: 'DFT capacity designed around closure.', scaleSummary: 'DFT work can be scoped as a focused methodology workstream or integrated into broader silicon implementation and verification programs.',
    scaleItems: [
      { value: 'Scan', title: 'Test architecture', description: 'Scan-oriented DFT planning and implementation activities.' },
      { value: 'ATPG', title: 'Pattern generation', description: 'Pattern development and fault-coverage analysis within the defined scope.' },
      { value: 'GLS', title: 'Downstream validation', description: 'Gate-level validation as a sign-off checkpoint.' },
      { value: 'Sign-off', title: 'Closure readiness', description: 'Integrated DFT closure across the stated methodology stages.' },
    ],
    ctaTitle: 'Have a DFT sign-off workstream to accelerate?', ctaDescription: 'Bring a scan, ATPG, fault-coverage, GLS, boundary-scan or CTL requirement and we can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a DFT Workstream',
  },
  'SoC & IP Engineering': {
    contextTitle: 'Why an IP portfolio strengthens SoC engineering credibility.', architectureLabel: 'SoC & IP portfolio architecture', architectureSummary: 'The supplied portfolio spans processor cores, coherent/non-coherent interconnect, high-speed I/O and memory controllers that can form major building blocks of heterogeneous SoC architectures.',
    architectureBenefits: [
      { title: 'Show reusable IP depth', description: 'The portfolio provides concrete technical evidence across processor, interconnect, memory and high-speed protocol building blocks.' },
      { title: 'Demonstrate subsystem integration', description: 'AXI/CHI interfaces and configurable architectures connect the individual IP blocks into broader SoC integration patterns.' },
      { title: 'Cover compute and AI memory paths', description: 'RISC-V, DDR and HBM evidence provides a credible technical path from compute cores to high-bandwidth memory subsystems.' },
      { title: 'Strengthen customer technical discussions', description: 'Each portfolio item can be reviewed as a focused technical reference rather than relying only on generic capability claims.' },
    ],
    methodologyLabel: 'IP engineering evidence flow', methodologyStages: ['Architecture', 'RTL', 'Verification', 'Integration', 'PPA / Timing', 'System Validation', 'Release'], assetsLabel: 'IP portfolio evidence',
    contributionTitle: 'SoC engineering where reusable IP meets integration.', contributionSummary: 'AionSi can position the supplied IP portfolio as evidence for SoC architecture, subsystem integration, verification and engineering workstream discussions.',
    contributionItems: [
      { title: 'Processor IP', description: 'RISC-V portfolio covering embedded, edge-AI, performance and multi-core cluster configurations with AXI/CHI integration.' },
      { title: 'Interconnect IP', description: 'AMBA CHI/AXI fabrics covering coherency, QoS, configurable topology, monitoring and heterogeneous compute connectivity.' },
      { title: 'Memory IP', description: 'DDR4/DDR5 and HBM2e/HBM3 controller portfolios covering scheduling, ECC, refresh, thermal and multi-client behavior.' },
      { title: 'High-speed protocol IP', description: 'PCIe Gen6 and USB 3.x/USB4 controller portfolios covering link management, error recovery, power and protocol integration.' },
    ],
    scaleTitle: 'A portfolio that maps to subsystem and SoC programs.', scaleSummary: 'The evidence can be used in customer discussions at IP, subsystem and SoC levels, while keeping each technical claim tied to its supplied portfolio source.',
    scaleItems: [
      { value: '6', title: 'IP families supplied', description: 'RISC-V, AMBA, PCIe, DDR, HBM and USB technical portfolio references.' },
      { value: 'CPU', title: 'Compute', description: 'Embedded through performance and cluster processor configurations.' },
      { value: 'MEM', title: 'Memory', description: 'DDR and HBM controller evidence for mainstream and AI/HPC memory paths.' },
      { value: 'I/O', title: 'Connectivity', description: 'PCIe and USB high-speed interface controller evidence.' },
    ],
    ctaTitle: 'Have an IP or SoC integration requirement?', ctaDescription: 'Use the supplied IP portfolio as the starting technical evidence for an architecture, subsystem, verification or SoC engineering discussion.', ctaButton: 'Discuss an IP / SoC Workstream',
  },
  'Protocol Verification': {
    contextTitle: 'Why protocol-level confidence matters.', architectureLabel: 'Protocol verification architecture', architectureSummary: 'The verification path connects interface stimulus and protocol behavior to checking, error scenarios, coverage and closure.',
    architectureBenefits: [
      { title: 'Accelerate interface bring-up', description: 'Reusable protocol-aware environments reduce repeated setup across interfaces, blocks and subsystem programs.' },
      { title: 'Expose corner cases early', description: 'Targeted stimulus, monitoring and error scenarios focus verification on protocol behavior under constrained conditions.' },
      { title: 'Strengthen protocol confidence', description: 'Assertions, scoreboards, protocol monitors and coverage support structured interface verification closure.' },
      { title: 'Scale verification capacity', description: 'AionSi can extend an established verification organization through focused protocol workstreams.' },
    ],
    methodologyLabel: 'Protocol verification methodology', methodologyStages: ['Plan', 'Stimulate', 'Monitor', 'Check', 'Inject Errors', 'Measure', 'Close'], assetsLabel: 'Protocol verification assets',
    contributionTitle: 'Protocol verification at the interface boundary.', contributionSummary: 'AionSi can contribute to protocol stimulus, checking, coverage and closure for defined interface requirements.',
    contributionItems: [
      { title: 'Interface stimulus', description: 'Develop targeted stimulus and sequences around defined protocol requirements and transaction behavior.' },
      { title: 'Protocol checking', description: 'Use monitors, scoreboards, assertions and protocol-aware checks to validate expected behavior.' },
      { title: 'Error and corner-case verification', description: 'Exercise replay, flow-control, reset, error-injection and boundary conditions where defined by scope.' },
      { title: 'Managed protocol workstream', description: 'Align engineers around interface scope, milestones, coverage objectives and closure deliverables.' },
    ],
    scaleTitle: 'Protocol engineering capacity designed to integrate.', scaleSummary: 'AionSi supports targeted protocol workstreams, managed verification scope and dedicated teams aligned to customer interface roadmaps.',
    scaleItems: [
      { value: 'PCIe', title: 'High-speed interfaces', description: 'Protocol-focused verification around defined PCIe behavior and data-link requirements.' },
      { value: 'DDR/HBM', title: 'Memory interfaces', description: 'Verification support around controller, PHY, training and subsystem interactions.' },
      { value: 'USB/AMBA', title: 'System interfaces', description: 'Reusable protocol-aware verification patterns for defined interface requirements.' },
      { value: 'ODC', title: 'Dedicated capacity', description: 'Engineering teams aligned to protocol scope, milestones and verification closure.' },
    ],
    ctaTitle: 'Have a protocol verification workstream to accelerate?', ctaDescription: 'Bring a PCIe, USB, DDR, HBM, AMBA or other interface verification requirement. We can map it to the appropriate AionSi engineering model.', ctaButton: 'Discuss a Protocol Workstream',
  },
};

export const getEvidencePresentation = (capability: string): EvidencePresentation => evidencePresentation[capability] ?? evidencePresentation['Design Verification'];
