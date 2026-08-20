export interface EnterpriseProof {
  number: string;
  title: string;
  description: string;
  items: string[];
  href?: string;
}

export const enterpriseProof: EnterpriseProof[] = [
  {
    number: '01',
    title: 'Representative Engineering Experience',
    description: 'Evidence-led examples of semiconductor engineering contribution across verification, physical implementation and SoC/IP engineering.',
    items: ['Physical Design implementation and sign-off', 'Reusable UVM verification architecture', 'Processor-driven SoC architecture and verification'],
    href: '/evidence/physical-design-representative-engineering-experience',
  },
  {
    number: '02',
    title: 'Delivery Models Built Around Ownership',
    description: 'AionSi can align engineering capacity to a defined specialist gap, managed workstream, project or dedicated engineering organization.',
    items: ['Specialist Engineering', 'Dedicated Engineering', 'Project Engineering', 'Engineering ODC'],
    href: '/solutions',
  },
  {
    number: '03',
    title: 'Evidence-Backed Technology Depth',
    description: 'Technology domains are presented conservatively and linked to the supplied technical capability evidence.',
    items: ['PCIe Gen6', 'USB 3.x / USB4', 'DDR4 / DDR5', 'HBM2e / HBM3', 'AMBA CHI / AXI', 'RISC-V'],
    href: '/technology',
  },
];
