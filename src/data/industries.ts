export interface Industry {
  slug: string;
  number: string;
  title: string;
  summary: string;
  challenges: string[];
  capabilities: string[];
  solution: string;
  ctaLabel: string;
}

export const industries: Industry[] = [
  {
    slug: 'semiconductor', number: '01', title: 'Semiconductor',
    summary: 'Engineering support for complex silicon programs across IP, verification, physical implementation and SoC integration.',
    challenges: ['Verification closure pressure', 'Specialist engineering capacity gaps', 'Complex IP and subsystem integration', 'Timing, sign-off and roadmap execution'],
    capabilities: ['RTL Design', 'Design Verification', 'Physical Design', 'DFT', 'Protocol Verification', 'SoC & IP Engineering'],
    solution: 'Connect a defined engineering problem to the right specialist, managed workstream or dedicated engineering model.', ctaLabel: 'Discuss a Semiconductor Requirement',
  },
  {
    slug: 'ai-hpc', number: '02', title: 'AI & HPC',
    summary: 'Engineering for compute-intensive silicon programs where memory bandwidth, interconnect, verification and SoC integration are critical.',
    challenges: ['High-bandwidth memory integration', 'Complex heterogeneous compute', 'Verification scale and convergence', 'Rapid architecture and roadmap cycles'],
    capabilities: ['SoC & IP Engineering', 'Design Verification', 'Protocol Verification', 'RTL Design'],
    solution: 'Build engineering capacity around compute, memory, interconnect and verification workstreams.', ctaLabel: 'Discuss an AI / HPC Requirement',
  },
  {
    slug: 'automotive', number: '03', title: 'Automotive Semiconductor',
    summary: 'Semiconductor engineering for automotive programs where reliability, integration discipline and verification confidence matter.',
    challenges: ['Complex SoC integration', 'Verification and validation depth', 'Interface reliability', 'Long program lifecycles and engineering continuity'],
    capabilities: ['Design Verification', 'Protocol Verification', 'SoC & IP Engineering', 'RTL Design'],
    solution: 'Extend engineering teams with defined ownership across verification, interface and SoC workstreams.', ctaLabel: 'Discuss an Automotive Requirement',
  },
  {
    slug: 'networking-connectivity', number: '04', title: 'Networking & Connectivity',
    summary: 'High-speed interface and subsystem engineering for connectivity-intensive silicon programs.',
    challenges: ['High-speed protocol complexity', 'Interoperability and compliance closure', 'Error recovery and corner cases', 'Subsystem integration'],
    capabilities: ['Protocol Verification', 'SoC & IP Engineering', 'Design Verification', 'RTL Design'],
    solution: 'Apply protocol-focused engineering depth to interface verification, IP integration and subsystem delivery.', ctaLabel: 'Discuss a Connectivity Requirement',
  },
];

export const getIndustry = (slug: string) => industries.find((industry) => industry.slug === slug);
