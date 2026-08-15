export interface Capability {
  slug: string;
  number: string;
  title: string;
  description: string;
  technologies?: string[];
  outcome?: string;
  evidenceStatus: 'ready-to-populate' | 'pending';
}

export const capabilities: Capability[] = [
  {
    slug: 'rtl-design',
    number: '01',
    title: 'RTL Design',
    description: 'RTL engineering across block, subsystem and SoC development.',
    technologies: ['Verilog', 'SystemVerilog', 'RTL Design'],
    outcome: 'Integration-ready RTL',
    evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'design-verification',
    number: '02',
    title: 'Design Verification',
    description: 'Verification expertise across block, subsystem and SoC levels.',
    technologies: ['SystemVerilog', 'UVM', 'Coverage', 'Assertions'],
    outcome: 'Coverage-driven verification confidence',
    evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'physical-design',
    number: '03',
    title: 'Physical Design',
    description: 'Physical implementation expertise across complex silicon programs.',
    evidenceStatus: 'pending',
  },
  {
    slug: 'dft',
    number: '04',
    title: 'DFT',
    description: 'Design-for-test engineering integrated into the silicon lifecycle.',
    technologies: ['Test Architecture', 'Scan', 'ATPG'],
    outcome: 'Manufacturing-test readiness',
    evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'protocol-verification',
    number: '05',
    title: 'Protocol Verification',
    description: 'Protocol-focused verification for complex semiconductor interfaces.',
    technologies: ['PCIe', 'USB', 'DDR', 'AMBA'],
    outcome: 'Interface-level verification confidence',
    evidenceStatus: 'ready-to-populate',
  },
  {
    slug: 'soc-ip',
    number: '06',
    title: 'SoC & IP Engineering',
    description: 'Engineering across IP integration, subsystem development and SoC integration.',
    technologies: ['IP', 'Subsystem', 'SoC Integration'],
    outcome: 'Integration-ready IP, subsystem and SoC delivery',
    evidenceStatus: 'ready-to-populate',
  },
];

export const getCapability = (slug: string) => capabilities.find((capability) => capability.slug === slug);
