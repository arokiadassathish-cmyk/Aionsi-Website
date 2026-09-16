export interface OutreachLandingPage {
  slug: string;
  company: string;
  region: string;
  eyebrow: string;
  headline: string;
  intro: string;
  relevance: string;
  capabilities: Array<{ title: string; detail: string }>;
  pilot: { title: string; detail: string; scope: string[] };
  engagementModel: string[];
  evidence: Array<{ title: string; href: string; detail: string }>;
  meetingLabel: string;
  meetingDetail: string;
  disclosure: string;
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
    slug: 'axiado',
    company: 'Axiado',
    region: 'India',
    eyebrow: 'AXIADO × AIONSI',
    headline: 'Engineering capacity for complex AI-infrastructure SoCs.',
    intro: 'A focused collaboration model for SoC verification, multi-subsystem verification and verification automation around defined engineering workstreams.',
    relevance: 'Axiado develops security and management silicon for AI and data-center infrastructure. Its DVCon Bengaluru activity included a design and verification perspective on highly integrated SoCs, making SoC verification and subsystem-level engineering the most relevant initial discussion areas.',
    capabilities: [
      { title: 'SoC Design Verification', detail: 'Functional verification support for complex SoCs and integrated security and management subsystems.' },
      { title: 'Multi-Subsystem Verification', detail: 'Verification of interactions across integrated blocks and subsystems using structured, reusable environments.' },
      { title: 'UVM & Verification Automation', detail: 'Reusable UVM infrastructure, regression and automation support for scalable verification execution.' },
    ],
    pilot: {
      title: 'Start with one defined engineering workstream',
      detail: 'Begin with a bounded verification or subsystem work package. AionSi engineers work alongside the existing team, processes and ownership.',
      scope: ['Defined verification scope and deliverables', 'Clear ownership and entry/exit criteria', 'Regular engineering review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Defined verification work package', 'Dedicated verification team', 'Multi-subsystem program support', 'Long-term engineering capacity'],
    evidence: [
      { title: 'Reusable UVM Verification Architecture', href: '/insights/reusable-uvm-verification-architecture', detail: 'A verification approach for scalable, reusable SoC environments.' },
      { title: 'Multi-Subsystem SoC Verification', href: '/insights/end-to-end-verification-of-multi-subsystem-iot-socs', detail: 'Engineering approach for verification across interconnected SoC subsystems.' },
      { title: 'PCIe Data Link Layer Verification', href: '/insights/pcie-5-data-link-layer-verification', detail: 'Representative verification methodology for a high-speed interface subsystem.' },
    ],
    meetingLabel: 'DISCUSS THE ENGINEERING REQUIREMENT',
    meetingDetail: 'Use a short technical discussion to understand the current requirement before defining any pilot or engineering workstream.',
    disclosure: 'This page is intended to provide context for an engineering discussion. It does not imply an Axiado customer relationship, approved association or active program engagement.',
  },
];
