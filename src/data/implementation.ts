export interface ImplementationExperience {
  slug: string;
  title: string;
  capability: string;
  context: string;
  engineeringScope: string[];
  evidenceHref: string;
}

export const implementationExperiences: ImplementationExperience[] = [
  {
    slug: 'advanced-node-physical-design',
    title: 'Advanced-Node Physical Design & Sign-Off Closure',
    capability: 'Physical Design',
    context: 'Representative engineering experience spanning implementation and closure across advanced-node programs.',
    engineeringScope: ['Floorplanning', 'Placement', 'Clock-tree synthesis', 'Routing and optimization', 'Timing closure', 'Physical verification and sign-off'],
    evidenceHref: '/evidence/physical-design-representative-engineering-experience',
  },
  {
    slug: 'reusable-uvm-verification',
    title: 'Reusable UVM Verification Architecture',
    capability: 'Design Verification',
    context: 'Reusable verification architecture supporting block, subsystem and SoC verification workflows.',
    engineeringScope: ['Verification planning', 'UVM agents and environments', 'Stimulus and checking', 'Scoreboards and predictors', 'Assertions and coverage', 'Regression and closure'],
    evidenceHref: '/evidence/reusable-uvm-verification-architecture',
  },
  {
    slug: 'pcie-data-link-verification',
    title: 'PCIe Data Link Layer Verification',
    capability: 'Protocol Verification',
    context: 'Protocol verification methodology focused on data-link behavior, replay, flow control and error handling.',
    engineeringScope: ['ACK/NAK handling', 'Replay behavior', 'Credit-based flow control', 'Protocol monitoring', 'Error injection', 'Functional coverage'],
    evidenceHref: '/evidence/pcie-5-data-link-layer-verification',
  },
];

export const getImplementationExperience = (slug: string) => implementationExperiences.find((item) => item.slug === slug);
