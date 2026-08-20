export interface EngineeringProof {
  slug: string;
  number: string;
  title: string;
  capability: string;
  summary: string;
  scope: string[];
  basis: string;
  href: string;
}

export const engineeringProof: EngineeringProof[] = [
  {
    slug: 'physical-design-representative-engineering-experience',
    number: '01',
    title: 'Representative Physical Design Experience',
    capability: 'Physical Design',
    summary: 'Representative engineering experience spanning physical implementation, timing closure, physical verification and sign-off across advanced-node programs.',
    scope: ['Floorplanning', 'Placement', 'CTS', 'Routing', 'Timing closure', 'Physical verification', 'Sign-off'],
    basis: 'Approved engineering evidence already published in the AionSi evidence library.',
    href: '/evidence/physical-design-representative-engineering-experience',
  },
  {
    slug: 'reusable-uvm-verification-architecture',
    number: '02',
    title: 'Reusable UVM Verification Architecture',
    capability: 'Design Verification',
    summary: 'Reusable verification infrastructure connecting protocol-aware stimulus, agents, monitors, scoreboards, coverage, assertions and regression workflows.',
    scope: ['SystemVerilog', 'UVM', 'Reusable agents', 'Scoreboarding', 'Coverage', 'Assertions', 'Regression'],
    basis: 'Approved technical evidence already published in the AionSi evidence library.',
    href: '/evidence/reusable-uvm-verification-architecture',
  },
  {
    slug: 'tarang-soc-architecture-verification',
    number: '03',
    title: 'Tarang SoC Architecture & Verification',
    capability: 'SoC & IP Engineering',
    summary: 'Processor-driven SoC engineering experience with AMBA APB3 peripherals, firmware self-checking and structured regression.',
    scope: ['SoC architecture', 'AMBA APB3', 'Firmware self-checking', 'Structured regression'],
    basis: 'Representative engineering evidence supplied for public website use.',
    href: '/evidence/tarang-soc-architecture-verification',
  },
];

export const getEngineeringProof = (slug: string) => engineeringProof.find((item) => item.slug === slug);
