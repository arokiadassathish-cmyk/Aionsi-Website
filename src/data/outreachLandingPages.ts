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
  meetingDetail: string;
  disclosure: string;
  conversationContext?: string;
  availability?: { label: string; detail: string };
}

export const outreachLandingPages: OutreachLandingPage[] = [
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
      { title: 'High-Speed Interface Verification', href: '/insights/pcie-5-data-link-layer-verification', detail: 'Representative verification methodology for complex high-speed interface work.' },
      { title: 'Memory Subsystem Verification', href: '/insights/hbm4e-memory-subsystem-verification', detail: 'Engineering approach for verification of high-bandwidth memory subsystem behavior.' },
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Verification approach across interconnected SoC subsystems and integration boundaries.' },
      { title: 'Formal Verification', href: '/insights/formal-verification-with-cadence-jaspergold', detail: 'Formal verification methodology for targeted design properties and sign-off support.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'We can use a 30-minute engineering discussion to understand where additional capacity or technical ownership could support the next semiconductor program. In person in Malaysia or virtually — whichever is convenient.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply an Oppstar customer relationship, approved association or active program engagement.',
  },
];
