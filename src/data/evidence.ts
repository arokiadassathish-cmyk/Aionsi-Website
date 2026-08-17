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
    slug: 'reusable-uvm-verification-architecture', title: 'Reusable UVM Verification Architecture', type: 'whitepaper', capability: 'Design Verification', revision: '1.0', classification: 'Technical Reference Architecture',
    positioning: 'Reusable SystemVerilog/UVM verification architecture designed to accelerate block, subsystem and SoC verification while improving reuse, coverage and verification closure.',
    context: ['Verification programs become more complex as interfaces, blocks and SoCs scale. Reusable verification infrastructure helps reduce repeated environment development and maintain consistent execution patterns.','The architecture is intended to scale across interface, subsystem and SoC verification programs while connecting stimulus, checking, coverage and analysis into a structured verification-closure workflow.'],
    architecture: ['Test and sequence layer','Environment and reusable agents','Sequencer and driver stimulus flow','Monitor and protocol observation','Scoreboard and checking infrastructure','Functional/code coverage and assertions','DUT interaction and regression analysis'],
    methodology: ['Plan — define verification objectives, interfaces and closure criteria','Develop — build reusable SystemVerilog/UVM environments and agents','Stimulate — generate controlled sequences and DUT interactions','Monitor — observe protocol activity and collect transaction data','Check — apply scoreboards, predictors, assertions and protocol checks','Measure — evaluate functional/code coverage and regression results','Close — analyze failures, resolve gaps and drive verification closure'],
    components: ['Drivers','Monitors','Sequencers','Scoreboards','Reusable agents','Coverage collectors','Assertions/checkers'],
    evidenceNotes: ['The reference material supports the reusable UVM architecture, component responsibilities and verification methodology presented here.','This page provides an engineering summary; the detailed whitepaper provides deeper technical context and methodology.'],
    sourceLabel: 'AionSi Engineering White Paper — Reusable UVM Verification Architecture',
  },
  'reusable-protocol-verification-architecture': {
    slug: 'reusable-protocol-verification-architecture', title: 'Reusable Protocol Verification Architecture', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Technical Reference Architecture',
    positioning: 'A reusable protocol-verification methodology connecting protocol-aware stimulus, agents, monitoring, checking, coverage and regression analysis across block, subsystem and SoC programs.',
    context: ['High-speed interfaces and memory subsystems combine protocol rules, error handling, ordering, recovery and integration behavior. Reusable protocol infrastructure helps structure these concerns consistently across programs.','The methodology is intended to connect specification-driven stimulus, protocol observation, checking, assertions, coverage and regression analysis into a repeatable verification-closure workflow.'],
    architecture: ['UVM test and virtual sequencing','Protocol-specific reusable agents','Sequencer, driver and BFM stimulus flow','Monitor and protocol observation','Scoreboard and predictor/reference model','Assertions, coverage and error injection','Regression reporting and closure analysis'],
    methodology: ['Plan — define protocol features, scenarios and closure criteria','Model — represent transactions, protocol states and checking intent','Stimulate — generate valid, stress and negative protocol scenarios','Monitor — capture transactions, responses, link/status events and errors','Check — apply scoreboards, predictors, protocol rules and assertions','Measure — evaluate functional, assertion and cross coverage plus regression results','Close — triage failures, debug protocol issues and drive closure'],
    components: ['Protocol sequencers','Drivers / BFMs','Protocol monitors','Scoreboards','Predictors / reference models','Protocol assertions/checkers','Coverage collectors and regression analysis'],
    evidenceNotes: ['The corporate capability flyer identifies reusable UVM-based protocol verification, protocol checkers, assertions, coverage, regression infrastructure and interoperability validation across high-speed interfaces and memory technologies.','Detailed protocol-specific case evidence is represented separately so the methodology is not conflated with individual customer or program claims.'],
    sourceLabel: 'AionSi Protocol Verification Engineering Reference',
  },
  'pcie-protocol-verification': {
    slug: 'pcie-protocol-verification', title: 'PCIe 5.0 / 6.0 Protocol Verification', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Protocol Verification Reference',
    positioning: 'PCIe protocol verification focused on transaction and data-link behavior, replay, flow control, error handling, assertions and coverage for high-speed interface programs.',
    context: ['PCIe verification requires coordinated stimulus and checking across transaction, data-link and link-management behavior.','The AionSi portfolio identifies PCIe Gen5/Gen6 Data Link and Protocol Verification, including replay-buffer and credit-based flow-control verification.'],
    architecture: ['Test configuration and scenario library','Sequencer and transaction generation','PCIe driver / BFM','PCIe DUT and interface observation','Scoreboard and checking mechanisms','Assertions and functional coverage','Regression and reporting'],
    methodology: ['Scenario planning','TLP / DLLP stimulus','Protocol monitoring','ACK/NAK, replay and flow-control checking','Error injection and recovery','Assertion and coverage analysis','Regression-driven closure'],
    components: ['Sequence library','Driver / BFM','Protocol monitor','Scoreboard','Protocol assertions','Coverage model','Error-injection scenarios'],
    evidenceNotes: ['The supplied engineering material includes PCIe 5.0 Data Link Layer verification and PCIe Gen5/Gen6 protocol verification scope.','PCIe 6.0-specific features should be treated as protocol-domain scope unless backed by a separately approved AionSi project artifact.'],
    sourceLabel: 'AionSi PCIe Protocol Verification Reference',
  },
  'usb4-protocol-verification': {
    slug: 'usb4-protocol-verification', title: 'USB 3.0 / USB4 Protocol Verification', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Protocol Verification Reference',
    positioning: 'USB protocol verification covering packet-layer and link-management behavior, recovery, flow control, compliance scenarios, reusable UVM VIP and interoperability verification.',
    context: ['The corporate engineering flyer identifies USB 3.0 / USB4 protocol verification with packet-layer, link-management, error-recovery and compliance focus.','The portfolio also identifies reusable UVM USB VIP, layered test sequences and coverage models to support protocol and interoperability verification.'],
    architecture: ['USB test and scenario layer','Reusable USB UVM VIP','Driver and interface BFM','Packet/link monitoring','Scoreboard and protocol checking','Assertions and compliance coverage','Regression and interoperability analysis'],
    methodology: ['Protocol scenario planning','Packet and link stimulus','Traffic and flow-control monitoring','Error recovery and negative testing','Compliance checking','Functional and assertion coverage','Regression and interoperability closure'],
    components: ['Reusable UVM USB VIP','Layered test sequences','Drivers / BFMs','Protocol monitors','Scoreboards / checkers','Coverage models','Regression infrastructure'],
    evidenceNotes: ['The corporate capability flyer explicitly lists USB 3.0 / USB4 protocol verification, packet-layer and link-management verification, error recovery, flow control, compliance scenarios, reusable UVM USB VIP, layered sequences, coverage models and interoperability verification.'],
    sourceLabel: 'AionSi Corporate Engineering Flyer — USB 3.0 / USB4 Evidence',
  },
  'ddr5-lpddr6-protocol-verification': {
    slug: 'ddr5-lpddr6-protocol-verification', title: 'DDR5 / LPDDR6 Memory Interface Verification', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Memory Interface Verification Reference',
    positioning: 'Memory-interface verification covering timing compliance, command sequencing, DFI/protocol verification, multi-channel synchronization, assertions, coverage and regression/debug workflows.',
    context: ['Memory-interface verification combines protocol sequencing, timing relationships, channel coordination and controller-to-interface behavior.','The corporate engineering flyer explicitly lists DDR5 / LPDDR6 verification scope and associated checkers, assertions, coverage and regression infrastructure.'],
    architecture: ['Memory test and configuration layer','Command and transaction sequencing','Controller / BFM interface','Memory protocol monitoring','Scoreboard and protocol checking','Timing / assertion / coverage analysis','Regression and debug'],
    methodology: ['Memory scenario planning','Command and data stimulus','Timing and protocol observation','DFI/protocol checking','Assertions and negative scenarios','Functional/cross coverage','Regression and closure'],
    components: ['Controller reference models','Protocol checkers','Assertions','Coverage models','Synchronization monitors','Regression infrastructure','Debug workflows'],
    evidenceNotes: ['The corporate engineering flyer identifies DDR5 / LPDDR6 memory interface verification, timing compliance, command sequencing, DFI/protocol verification, multi-channel synchronization, controller reference models, protocol checkers, assertions, coverage and regression infrastructure/debug.'],
    sourceLabel: 'AionSi Corporate Engineering Flyer — DDR5 / LPDDR6 Evidence',
  },
  'hbm4e-protocol-verification': {
    slug: 'hbm4e-protocol-verification', title: 'HBM4e Memory Subsystem Verification', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Memory Subsystem Verification Reference',
    positioning: 'HBM4e verification across multi-channel memory interface behavior, training, calibration, PHY timing alignment, error handling and reliability validation.',
    context: ['HBM subsystem verification combines memory-controller behavior with PHY and multi-channel interface requirements, making protocol-aware checking and coverage important at subsystem level.','The corporate flyer identifies HBM4e JEDEC-compliant multi-channel interface verification, training, calibration, PHY timing alignment and error-handling/reliability validation.'],
    architecture: ['HBM test and configuration','Controller command generation','Multi-channel interface agents','PHY timing and training observation','Scoreboard / reference model','Protocol assertions and coverage','Regression and reliability analysis'],
    methodology: ['Interface and scenario planning','Command / data stimulus','Training and calibration checks','PHY timing verification','Error injection and recovery','Coverage and regression analysis','Subsystem closure'],
    components: ['HBM controller models','Protocol monitors','PHY timing monitors','Scoreboards','Assertions','Coverage models','Regression/debug infrastructure'],
    evidenceNotes: ['The corporate engineering flyer identifies HBM4e Memory Subsystem verification and separately describes JEDEC-compliant verification, training, calibration, PHY timing alignment, error handling and reliability validation.'],
    sourceLabel: 'AionSi Corporate Engineering Flyer — HBM4e Evidence',
  },
  'axi-reusable-verification-ip': {
    slug: 'axi-reusable-verification-ip', title: 'Reusable AXI Verification IP Environment', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Reusable Verification IP Architecture',
    positioning: 'Reusable AMBA/AXI master and slave verification architecture supporting sequencers, drivers, monitors, scoreboarding and functional coverage.',
    context: ['AXI verification benefits from reusable master and slave agents that can be configured for different interface roles and reused across subsystem programs.','The supplied AXI architecture demonstrates a reusable UVM environment with master/slave agents, interface observation, checking and coverage.'],
    architecture: ['UVM test and virtual sequencing','AXI master agent','AXI slave agent','AXI interface / DUT','Scoreboard','Functional coverage','Assertions'],
    methodology: ['Scenario planning','Master/slave transaction stimulus','Protocol monitoring','Expected-vs-actual checking','Response validation','Coverage analysis','Regression closure'],
    components: ['Sequencers','Drivers','Monitors','Master/slave agents','Scoreboard','Coverage model','Assertions'],
    evidenceNotes: ['This architecture is based on the supplied AionSi AXI verification environment diagram and is used as a reusable AMBA/AXI reference rather than a named customer case study.'],
    sourceLabel: 'AionSi AXI Verification IP Architecture Reference',
  },
  'pcie-gen6-endpoint-rtl-architecture': {
    slug: 'pcie-gen6-endpoint-rtl-architecture', title: 'PCIe Gen6 Endpoint RTL Architecture', type: 'whitepaper', capability: 'Protocol Verification', revision: '1.0', classification: 'Confidential Engineering Architecture Reference',
    positioning: 'Internal AionSi endpoint architecture reference covering PCIe Gen6 Transaction, Data Link and Physical Layer responsibilities and integration interfaces.',
    context: ['The supplied confidential engineering specification documents a PCIe Gen6 endpoint architecture, including AXI-Lite integration, Transaction Layer, Data Link Layer, Physical Layer and end-to-end TX/RX flow.','The architecture also addresses Gen6-specific concepts including Flit operation, PAM4, FEC/CRC, replay, flow control, LTSSM, equalization and lane management.'],
    architecture: ['AXI-Lite control interface','Transaction Layer','Data Link Layer','Physical Layer','LTSSM and link management','Lane / PHY management','End-to-end TX/RX flow'],
    methodology: ['Architecture planning','Layer responsibility definition','Interface specification','Transaction and flow analysis','Error and recovery architecture','Clock, reset and integration planning','Engineering review'],
    components: ['AXI-Lite interface','Transaction Layer logic','Data Link Layer logic','Replay / flow-control logic','PHY / lane management','LTSSM','Error reporting'],
    evidenceNotes: ['The supplied source is marked confidential/internal and is therefore not presented as a public downloadable document or customer case study.','This reference supports architecture depth only; it must not be represented as evidence of a completed PCIe Gen6 verification project without separate approved verification evidence.'],
    sourceLabel: 'AionSi PCIe Gen6 Endpoint RTL Architecture Specification — Confidential Internal Reference',
  },
};

export const getEvidenceDetail = (slug: string) => evidenceDetails[slug];
