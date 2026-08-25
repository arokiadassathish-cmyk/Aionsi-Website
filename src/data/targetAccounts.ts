export interface TargetAccount {
  slug: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  focusAreas: string[];
  discoveryPath: string[];
  disclosure: string;
}

export const targetAccounts: TargetAccount[] = [
  {
    slug: 'amd',
    name: 'AMD',
    category: 'AI & high-performance semiconductor engineering',
    headline: 'Engineering capabilities relevant to complex compute and silicon programs.',
    description: 'AionSi capabilities can be evaluated against defined engineering requirements across design verification, physical design, DFT, protocol verification and SoC integration.',
    focusAreas: ['SoC & subsystem verification', 'PCIe and protocol verification', 'Physical design and timing closure', 'DFT and sign-off'],
    discoveryPath: ['Requirement', 'Capability mapping', 'Technical evidence', 'Bounded qualification', 'Scale decision'],
    disclosure: 'This page describes capability relevance only. It does not imply that AMD is an AionSi customer or that any specific AMD program is supported.',
  },
  {
    slug: 'qualcomm',
    name: 'Qualcomm',
    category: 'Mobile, connectivity and compute silicon',
    headline: 'Engineering depth for demanding SoC, interface and verification programs.',
    description: 'AionSi can support defined engineering workstreams where verification, protocol complexity, physical implementation, DFT or SoC integration require additional specialist capacity.',
    focusAreas: ['SoC and IP verification', 'High-speed protocol verification', 'Physical implementation', 'DFT and closure'],
    discoveryPath: ['Engineering requirement', 'Capability fit', 'Evidence review', 'Pilot', 'Expansion'],
    disclosure: 'This page describes capability relevance only and does not imply a Qualcomm customer relationship.',
  },
  {
    slug: 'nvidia',
    name: 'NVIDIA',
    category: 'AI accelerator and data-center silicon',
    headline: 'Specialist engineering support for verification, interfaces and silicon execution.',
    description: 'AionSi can be evaluated for bounded engineering work around SoC verification, protocol-intensive interfaces, physical implementation and silicon-facing execution.',
    focusAreas: ['AI accelerator verification', 'PCIe and protocol verification', 'Physical design and timing', 'DFT and sign-off'],
    discoveryPath: ['Problem definition', 'Technical mapping', 'Representative evidence', 'Qualification', 'Scale'],
    disclosure: 'This page describes capability relevance only and does not imply a NVIDIA customer relationship.',
  },
  {
    slug: 'bosch',
    name: 'Bosch',
    category: 'Automotive and embedded semiconductor engineering',
    headline: 'Engineering support for automotive silicon, verification and embedded programs.',
    description: 'AionSi can support defined workstreams spanning verification, SoC/IP engineering, DFT and physical implementation where engineering ownership and predictable execution matter.',
    focusAreas: ['SoC/IP verification', 'Automotive semiconductor engineering', 'DFT and validation', 'Physical implementation'],
    discoveryPath: ['Requirement', 'Capability mapping', 'Technical qualification', 'Pilot', 'Sustained delivery'],
    disclosure: 'This page describes capability relevance only and does not imply a Bosch customer relationship.',
  },
  {
    slug: 'synopsys',
    name: 'Synopsys',
    category: 'EDA and semiconductor design ecosystem',
    headline: 'Engineering capabilities aligned to verification, implementation and semiconductor design workflows.',
    description: 'AionSi can be evaluated for specialist engineering work where verification, implementation, protocol and SoC/IP execution require additional capacity.',
    focusAreas: ['Design verification', 'Physical design', 'Protocol verification', 'SoC/IP engineering'],
    discoveryPath: ['Use case', 'Capability fit', 'Evidence', 'Qualification', 'Scale'],
    disclosure: 'This page describes capability relevance only and does not imply a Synopsys customer relationship.',
  },
  {
    slug: 'ayar-labs',
    name: 'Ayar Labs',
    category: 'Optical I/O, chiplet and AI infrastructure silicon',
    headline: 'Digital silicon engineering around optical I/O, chiplet and high-speed integration boundaries.',
    description: 'AionSi can be evaluated for digital engineering work surrounding verification, protocol behavior, physical implementation, timing and integration in complex silicon programs.',
    focusAreas: ['Chiplet and protocol verification', 'High-speed interface verification', 'Physical implementation and timing', 'Silicon integration'],
    discoveryPath: ['Engineering boundary', 'Capability fit', 'Evidence review', 'Bounded work package', 'Scale'],
    disclosure: 'This page describes capability relevance only and does not imply an Ayar Labs customer relationship.',
  },
  {
    slug: 'hrdwyr',
    name: 'HrdWyr',
    category: 'AI-native edge semiconductor products',
    headline: 'Engineering support aligned to verification, SoC execution and productization.',
    description: 'AionSi can be evaluated for bounded engineering work across verification, RTL/SoC integration, physical implementation, DFT and engineering delivery.',
    focusAreas: ['SoC verification', 'RTL and integration', 'Physical design', 'DFT and delivery'],
    discoveryPath: ['Problem definition', 'Capability mapping', 'Technical workshop', 'Pilot', 'Scale'],
    disclosure: 'This page describes capability relevance only and does not imply a HrdWyr customer relationship.',
  },
];
