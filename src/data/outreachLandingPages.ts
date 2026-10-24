export interface OutreachLandingPage {
  slug: string;
  company: string;
  region: string;
  eyebrow: string;
  headline: string;
  heroHeadline?: string;
  contextTag?: string;
  intro: string;
  relevance: string;
  capabilities: Array<{ title: string; detail: string }>;
  pilot: { title: string; detail: string; scope: string[] };
  engagementModel: string[];
  evidence: Array<{ title: string; href: string; detail: string }>;
  meetingLabel: string;
  meetingDetail: string;
  disclosure: string;
  conversationContext?: string;
  availability?: { label: string; detail: string };
}

export const outreachLandingPages: OutreachLandingPage[] = [
  {
    slug: 'micron',
    company: 'Micron Technology',
    region: 'United States / India',
    eyebrow: 'MICRON × AIONSI',
    headline: 'Engineering capacity for memory, storage and complex silicon programs.',
    heroHeadline: "Engineering support for Micron's complex silicon engineering workstreams.",
    contextTag: 'Engineering leadership discussion',
    intro: 'A focused collaboration model across design verification, memory subsystem verification, high-speed interfaces and engineering automation — structured around defined work packages and measurable milestones.',
    conversationContext: 'AionSi can complement an existing semiconductor engineering organization with focused execution capacity for defined verification, interface or automation workstreams while keeping program ownership and engineering interfaces with the core team.',
    relevance: 'The campaign research package is centered on engineering signals around RTL/IP verification, memory and storage systems, PCIe/NVMe and engineering automation. The page therefore focuses on bounded engineering work rather than assuming a specific Micron program or requirement.',
    capabilities: [
      { title: 'Design Verification', detail: 'SystemVerilog/UVM verification, regression, coverage closure and subsystem-level verification for defined IP or SoC work packages.' },
      { title: 'Memory & Storage Verification', detail: 'Verification support for memory subsystems and storage-oriented silicon interfaces, with structured regression and coverage workflows.' },
      { title: 'PCIe / NVMe & High-Speed Interfaces', detail: 'Protocol and interface verification support for high-speed connectivity and storage-related engineering workstreams.' },
      { title: 'Engineering Automation', detail: 'Python and workflow automation for regression, analysis and engineering execution.' },
    ],
    pilot: {
      title: 'Start with one defined engineering work package',
      detail: 'Begin with a bounded verification, interface or automation scope with clear ownership, deliverables and milestone-based review before considering broader capacity.',
      scope: ['Defined technical scope and deliverables', 'Clear engineering ownership and interfaces', 'Milestone-based delivery and review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Project Engineering', 'Extended Engineering', 'Dedicated Team', 'ODC / Long-term Engineering Capacity'],
    evidence: [
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Representative verification approach across interconnected SoC subsystems and integration boundaries.' },
      { title: 'PCIe Data Link Layer Verification', href: '/insights/pcie-5-data-link-layer-verification', detail: 'Representative verification methodology for high-speed PCIe interface work.' },
      { title: 'Reusable UVM Verification Architecture', href: '/insights/reusable-uvm-verification-architecture', detail: 'Reusable SystemVerilog/UVM architecture for scalable verification environments.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand the relevant workstream and determine whether a bounded engineering package makes sense.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply a Micron customer relationship, approved association or active program engagement.',
  },
  {
    slug: 'axiado',
    company: 'Axiado',
    region: 'United States / India',
    eyebrow: 'AXIADO × AIONSI',
    headline: 'Verification engineering for secure AI infrastructure silicon.',
    heroHeadline: "Verification engineering for Axiado's secure AI SoC programs.",
    contextTag: 'Engineering leadership discussion',
    intro: 'A focused collaboration model around SoC design verification, multi-subsystem verification and verification automation for defined engineering work packages.',
    conversationContext: "AionSi can complement an existing silicon engineering organization with focused verification capacity for defined blocks or subsystems, while keeping program ownership and engineering interfaces with the core team.",
    relevance: 'The campaign package identifies SoC Design Verification as the primary capability match, with a secure AI infrastructure / SoC engineering signal. The page therefore focuses on verification work that can be bounded, owned and reviewed through clear engineering milestones.',
    capabilities: [
      { title: 'SoC Design Verification', detail: 'SystemVerilog/UVM verification, regression, coverage closure and subsystem-level verification for defined SoC work packages.' },
      { title: 'Multi-Subsystem Verification', detail: 'Verification across subsystem boundaries with structured integration, regression and coverage workflows.' },
      { title: 'UVM & Verification Automation', detail: 'Reusable verification environments and automation to improve regression, analysis and engineering execution.' },
    ],
    pilot: {
      title: 'Start with one defined verification work package',
      detail: 'Begin with a bounded IP, subsystem or verification-automation scope, with clear ownership, milestones and engineering review before any broader scale-up.',
      scope: ['Defined verification scope and deliverables', 'Clear engineering ownership and interfaces', 'Milestone-based verification review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Project Engineering', 'Extended Verification Team', 'Dedicated Team', 'Long-term Engineering Capacity'],
    evidence: [
      { title: 'Multi-Subsystem SoC Verification', href: '/insights', detail: 'Verification approach across interconnected SoC subsystems and integration boundaries.' },
      { title: 'Reusable UVM Verification Architecture', href: '/insights', detail: 'Reusable verification architecture for scalable SystemVerilog/UVM environments.' },
      { title: 'Formal Verification', href: '/insights', detail: 'Formal verification methodology for targeted design properties and sign-off support.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand the relevant verification workstream and determine whether a bounded engineering package makes sense.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply an Axiado customer relationship, approved association or active program engagement.',
  },
  {
    slug: 'infinecs',
    company: 'Infinecs',
    region: 'Malaysia',
    eyebrow: 'INFINECS × AIONSI',
    headline: 'Engineering capacity for semiconductor design and verification.',
    heroHeadline: "Engineering capacity for Infinecs' semiconductor programs.",
    contextTag: 'Engineering leadership discussion',
    intro: 'A focused collaboration model across physical design, DFT, RTL/SoC and design verification, structured around defined work packages and measurable milestones.',
    conversationContext: "AionSi can complement an existing semiconductor engineering organization with additional execution capacity or specialist ownership for defined engineering work packages, while preserving the existing team's program interfaces and ownership.",
    availability: {
      label: 'IN MALAYSIA · 20 SEP – 5 OCT 2026',
      detail: 'AionSi management will be available for engineering discussions during this period.'
    },
    relevance: 'The campaign dashboard identifies Physical Design & DFT as the current capability match and a semiconductor engineering requirement as the signal. This page keeps that focus while allowing adjacent RTL/SoC and verification work to be discussed where relevant.',
    capabilities: [
      { title: 'Physical Design & DFT', detail: 'Focused implementation, timing, sign-off and DFT engineering capacity for defined work packages.' },
      { title: 'RTL & SoC Engineering', detail: 'Front-end RTL and SoC engineering support for defined blocks, subsystems or parallel execution workstreams.' },
      { title: 'Design Verification', detail: 'SystemVerilog/UVM verification, regression, coverage closure and subsystem-level verification support.' },
      { title: 'Engineering Automation', detail: 'Python and workflow automation for regression, analysis and engineering execution.' },
    ],
    pilot: {
      title: 'Start with one defined engineering work package',
      detail: 'Begin with a bounded implementation, DFT, RTL or verification work package with clear entry/exit criteria and milestone-based review.',
      scope: ['Defined technical scope and deliverables', 'Clear engineering ownership and interfaces', 'Milestone-based delivery and review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Project Engineering', 'Extended Engineering', 'Dedicated Team', 'ODC / Long-term Engineering Capacity'],
    evidence: [
      { title: 'Physical Design & Sign-off', href: '/capabilities/physical-design', detail: 'AionSi physical-design capability context for implementation and sign-off discussions.' },
      { title: 'DFT Engineering', href: '/capabilities', detail: 'AionSi DFT capability context for test architecture and sign-off work.' },
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Verification approach across interconnected SoC subsystems and integration boundaries.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand the current requirement and identify a bounded work package. In person in Malaysia or virtually — whichever is convenient.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply an Infinecs customer relationship, approved association or active program engagement.',
  },
  {
    slug: 'greatasic',
    company: 'GreatAsic',
    region: 'Malaysia',
    eyebrow: 'GREATASIC × AIONSI',
    headline: 'Engineering capacity for custom ASIC and SoC programs.',
    intro: 'A focused collaboration model across front-end design, verification and SoC engineering, structured around defined program milestones.',
    relevance: 'GreatAsic develops custom ASIC and SoC solutions across data center, Edge AI, automotive and intelligent computing applications. The potential fit is around focused engineering capacity for defined workstreams and milestones.',
    capabilities: [
      { title: 'RTL & Front-End Design', detail: 'RTL development and front-end engineering support around defined blocks or subsystems.' },
      { title: 'Design Verification', detail: 'UVM-based verification, regression, coverage and subsystem-level verification support.' },
      { title: 'SoC Integration', detail: 'Subsystem integration and verification support across complex SoC programs.' },
    ],
    pilot: {
      title: 'Start with one defined engineering workstream',
      detail: 'Begin with a bounded RTL, DV or subsystem work package. AionSi engineers work alongside the existing team, processes and ownership.',
      scope: ['Defined scope and deliverables', 'Clear ownership and entry/exit criteria', 'Regular engineering review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Defined engineering work package', 'Dedicated engineering team', 'Multi-workstream program support', 'Long-term engineering capacity'],
    evidence: [
      { title: 'Reusable UVM Verification Architecture', href: '/insights/reusable-uvm-verification-architecture', detail: 'A verification approach for scalable, reusable SoC environments.' },
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Engineering approach for verification across interconnected SoC subsystems.' },
      { title: 'PCIe Data Link Layer Verification', href: '/insights/pcie-5-data-link-layer-verification', detail: 'Representative verification methodology for a high-speed interface subsystem.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'AionSi management will be in Malaysia from 20 September to 5 October 2026. We can use a short meeting to understand the current requirement before defining any pilot.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply a GreatAsic customer relationship, approved association or active program engagement.',
  },
  {
    slug: 'oppstar',
    company: 'Oppstar',
    region: 'Malaysia',
    eyebrow: 'OPPSTAR × AIONSI',
    headline: 'Engineering capacity for complex semiconductor programs.',
    heroHeadline: "Engineering capacity for Oppstar's next semiconductor program.",
    contextTag: 'Engineering leadership discussion',
    intro: 'A focused collaboration model across RTL & SoC, design verification, physical design, DFT and engineering automation — structured around defined work packages and measurable milestones.',
    conversationContext: "Semiconductor programs often need additional execution capacity without changing core program ownership. AionSi's model is built around defined work packages, engineering ownership and milestone-based delivery, allowing an existing team to extend execution capacity while keeping its core structure.",
    availability: {
      label: 'IN MALAYSIA · 20 SEP – 5 OCT 2026',
      detail: 'AionSi management will be available for engineering discussions during this period.'
    },
    relevance: 'The potential fit is complementary rather than duplicative: AionSi can support defined RTL and SoC, design verification, physical design, DFT, system and embedded engineering, and engineering automation workstreams where additional capacity or technical ownership is useful.',
    capabilities: [
      { title: 'RTL & SoC Engineering', detail: 'Front-end RTL and SoC engineering support for defined blocks, subsystems or parallel execution workstreams.' },
      { title: 'Design Verification', detail: 'SystemVerilog/UVM environments, regression automation, coverage closure and subsystem-level verification for defined IP or SoC work packages.' },
      { title: 'Physical Design & DFT', detail: 'Focused physical design and DFT engineering capacity for defined implementation, sign-off or test work packages.' },
      { title: 'Engineering Automation', detail: 'Python and workflow automation to improve regression, analysis and engineering execution across programs.' },
    ],
    pilot: {
      title: 'Start with one defined engineering work package',
      detail: 'AionSi can take ownership of a bounded work package and operate alongside the existing Oppstar engineering organization, with clear milestones and review points before any broader scale-up.',
      scope: ['Defined technical scope and deliverables', 'Clear engineering ownership and interfaces', 'Milestone-based delivery and review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Project Engineering', 'Extended Engineering', 'Dedicated Team', 'ODC / Long-term Engineering Capacity'],
    evidence: [
      { title: 'High-Speed Interface Verification', href: '/insights', detail: 'Representative verification methodology for complex high-speed interface work.' },
      { title: 'Memory Subsystem Verification', href: '/insights', detail: 'Engineering approach for verification of high-bandwidth memory subsystem behavior.' },
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Verification approach across interconnected SoC subsystems and integration boundaries.' },
      { title: 'Formal Verification', href: '/insights/formal-verification-with-cadence-jaspergold', detail: 'Formal verification methodology for targeted design properties and sign-off support.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand where additional capacity or technical ownership could support the next semiconductor program. In person in Malaysia or virtually — whichever is convenient.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply an Oppstar customer relationship, approved association or active program engagement.',
  },

  {
    slug: 'samsung-semiconductor',
    company: 'Samsung Semiconductor India Research',
    region: 'India / Global',
    eyebrow: 'SAMSUNG SEMICONDUCTOR × AIONSI',
    headline: 'Engineering capacity for complex semiconductor, memory and AI silicon workstreams.',
    heroHeadline: "Engineering support for Samsung Semiconductor's complex silicon engineering workstreams.",
    contextTag: 'Engineering leadership discussion',
    intro: 'A focused collaboration model across design verification, SoC/IP integration, memory and high-speed interfaces, physical implementation, DFT and engineering automation — structured around defined work packages and measurable milestones.',
    conversationContext: 'AionSi can complement an established semiconductor engineering organization with focused execution capacity for defined verification, interface, implementation or automation workstreams while keeping program ownership and engineering interfaces with the core team.',
    relevance: 'Public Samsung Semiconductor India Research material identifies work across System LSI, Memory and Foundry, including Foundation IP Design, Serial Interfaces, Multimedia IPs, Mobile SoCs, Storage Solutions, 4G/5G Solutions, Neural Processors and AI/ML. The page therefore focuses on capability relevance across verification, interfaces, SoC integration, implementation and automation without assuming a specific Samsung program or requirement.',
    capabilities: [
      { title: 'SoC & IP Design Verification', detail: 'SystemVerilog/UVM verification, regression, coverage closure and subsystem-level verification for defined IP, SoC or interface work packages.' },
      { title: 'Memory & High-Speed Interface Verification', detail: 'Verification support for memory-oriented systems and high-speed interfaces, with structured protocol, regression and coverage workflows.' },
      { title: 'Physical Design & DFT', detail: 'Focused implementation, timing, sign-off and DFT engineering capacity for defined silicon work packages.' },
      { title: 'Engineering Automation', detail: 'Python and workflow automation for regression, analysis and repeatable engineering execution.' },
    ],
    pilot: {
      title: 'Start with one defined engineering work package',
      detail: 'Begin with a bounded verification, interface, implementation or automation scope with clear ownership, deliverables and milestone-based review before considering broader capacity.',
      scope: ['Defined technical scope and deliverables', 'Clear engineering ownership and interfaces', 'Milestone-based delivery and review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Project Engineering', 'Extended Engineering', 'Dedicated Team', 'ODC / Long-term Engineering Capacity'],
    evidence: [
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Representative verification approach across interconnected SoC subsystems and integration boundaries.' },
      { title: 'PCIe Data Link Layer Verification', href: '/insights/pcie-5-data-link-layer-verification', detail: 'Representative verification methodology for high-speed PCIe interface work.' },
      { title: 'Reusable UVM Verification Architecture', href: '/insights/reusable-uvm-verification-architecture', detail: 'Reusable SystemVerilog/UVM architecture for scalable verification environments.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand the relevant workstream and determine whether a bounded engineering package makes sense.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply a Samsung customer relationship, approved association or active program engagement.',
  },
];
