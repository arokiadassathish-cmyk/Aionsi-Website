export interface Solution {
  slug: string;
  number: string;
  title: string;
  summary: string;
  idealFor: string[];
  engagement: string[];
  outcome: string;
  ctaLabel: string;
  ownership: string;
  ownershipSummary: string;
}

export const solutions: Solution[] = [
  {
    slug: 'dedicated-engineering',
    number: '01',
    title: 'Dedicated Engineering',
    summary: 'Dedicated semiconductor engineering capacity aligned to a defined roadmap, capability or workstream.',
    idealFor: ['Program capacity gaps', 'Specialist engineering needs', 'Roadmap-aligned teams', 'Longer-term ownership'],
    engagement: ['Define scope', 'Assemble team', 'Integrate workflows', 'Execute with governance', 'Scale with roadmap'],
    outcome: 'Engineering continuity with dedicated ownership.',
    ctaLabel: 'Discuss Dedicated Engineering',
    ownership: 'A dedicated engineering team aligned to your roadmap.',
    ownershipSummary: 'AionSi provides the engineering team, technical leadership and delivery rhythm needed for sustained program ownership.',
  },
  {
    slug: 'extended-engineering',
    number: '02',
    title: 'Extended Engineering',
    summary: 'Extend an existing customer engineering organization with specialist capacity and technical continuity.',
    idealFor: ['Capacity augmentation', 'Specialist gaps', 'Existing customer teams', 'Rapid expansion'],
    engagement: ['Assess requirement', 'Map capability', 'Build engineering pod', 'Integrate with customer team', 'Execute with governance', 'Scale as needed'],
    outcome: 'Additional engineering capacity without disrupting the core organization.',
    ctaLabel: 'Discuss Extended Engineering',
    ownership: 'Specialist engineering ownership that fits into the customer organization.',
    ownershipSummary: 'AionSi extends an established team while preserving the customer\'s technical direction, interfaces and day-to-day ownership model.',
  },
  {
    slug: 'project-engineering',
    number: '03',
    title: 'Project Engineering',
    summary: 'Engage AionSi around a defined scope, milestones, deliverables and technical ownership.',
    idealFor: ['Defined technical scope', 'Turnkey work packages', 'Subsystem delivery', 'Time-bound programs'],
    engagement: ['Scope requirement', 'Plan milestones', 'Execute work package', 'Validate deliverables', 'Close and transition'],
    outcome: 'Outcome-oriented engineering delivery around defined milestones.',
    ctaLabel: 'Discuss a Project Requirement',
    ownership: 'Clear ownership for a bounded technical outcome.',
    ownershipSummary: 'AionSi aligns engineering execution to defined deliverables, interfaces, milestones and acceptance criteria.',
  },
  {
    slug: 'odc',
    number: '04',
    title: 'Engineering ODC',
    summary: 'Build a dedicated semiconductor engineering organization with leadership, governance and scalable capacity.',
    idealFor: ['Multi-disciplinary programs', 'Roadmap ownership', 'Long-term engineering scale', 'Dedicated delivery organizations'],
    engagement: ['Define charter', 'Build organization', 'Integrate with roadmap', 'Operate with governance', 'Scale capacity'],
    outcome: 'A governed engineering organization aligned to the silicon roadmap.',
    ctaLabel: 'Discuss Your ODC Requirement',
    ownership: 'A governed engineering organization built for long-term scale.',
    ownershipSummary: 'AionSi establishes the team structure, technical leadership, operating cadence and governance needed to support sustained engineering programs.',
  },
];

export const getSolution = (slug: string) => solutions.find((solution) => solution.slug === slug);
