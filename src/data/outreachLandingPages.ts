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
    eyebrow: 'ENGINEERING COLLABORATION',
    headline: 'A focused engineering path for custom ASIC and SoC programs.',
    intro: 'AionSi supports semiconductor product teams with defined engineering work across RTL, Design Verification, SoC Integration, DFT and Physical Design.',
    relevance: 'GreatAsic develops custom ASIC and SoC solutions across data center, Edge AI, automotive and intelligent computing applications. The potential fit is around adding focused engineering capacity to defined program milestones.',
    capabilities: [
      { title: 'RTL & Front-End Design', detail: 'RTL development and front-end engineering support around defined blocks or subsystems.' },
      { title: 'Design Verification', detail: 'UVM-based verification, regression, coverage and subsystem-level verification support.' },
      { title: 'SoC Integration', detail: 'Subsystem integration and verification support across complex SoC programs.' },
      { title: 'DFT & Physical Design', detail: 'Defined DFT and implementation work packages where additional engineering bandwidth is required.' },
    ],
    pilot: {
      title: 'A small, defined engineering milestone',
      detail: 'Start with a bounded work package rather than a broad services engagement. AionSi engineers work alongside the existing team, processes and ownership.',
      scope: ['One block, subsystem or verification workstream', 'Clear entry and exit criteria', 'Weekly engineering review', 'Evidence-based decision to continue or scale'],
    },
    engagementModel: ['Defined pilot', 'Dedicated engineering team', 'Ongoing program support', 'ODC model for sustained capacity'],
    evidence: [
      { title: 'Semiconductor capabilities', href: '/capabilities', detail: 'Review AionSi engineering capabilities across the silicon lifecycle.' },
      { title: 'Engineering evidence', href: '/evidence', detail: 'Review technical references and evidence-led engineering work.' },
      { title: 'Representative experience', href: '/experience', detail: 'Review representative engineering ownership and delivery context.' },
    ],
    meetingLabel: 'Meet in Malaysia',
    meetingDetail: 'AionSi management will be in Malaysia from 20 September to 5 October 2026. We can use a short meeting to understand the current requirement before defining any pilot.',
    disclosure: 'This page is a capability-relevance and collaboration discussion page. It does not imply a GreatAsic customer relationship, approved association or active program engagement.',
  },
];
