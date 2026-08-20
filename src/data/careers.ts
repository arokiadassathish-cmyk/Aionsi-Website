export type CareerRole = {
  slug: string;
  title: string;
  experience: string;
  location: string;
  priority?: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: 'soc-dv-manager',
    title: 'SoC DV Manager',
    experience: '10+ years',
    location: 'Hyderabad',
    summary: 'Lead SoC design verification programs with strong team leadership, verification strategy and delivery ownership.',
    responsibilities: [
      'Lead SoC design verification strategy, execution and closure.',
      'Own verification planning, technical reviews, debug and delivery milestones.',
      'Build and mentor a strong design verification engineering team.',
    ],
    skills: ['SoC Design Verification', 'SystemVerilog / UVM', 'Technical Leadership', 'Verification Closure'],
  },
  {
    slug: 'emulation-engineer',
    title: 'Emulation Engineer',
    experience: '3+ years',
    location: 'Hyderabad',
    priority: 'Immediate joiners preferred',
    summary: 'Join the emulation team to develop, debug and execute complex SoC emulation flows.',
    responsibilities: [
      'Work on SoC emulation environments and execution flows.',
      'Debug emulation failures and collaborate with design and verification teams.',
      'Contribute to reliable emulation bring-up and execution methodology.',
    ],
    skills: ['Emulation', 'SoC Verification', 'Debug', 'Semiconductor Design Flows'],
  },
  {
    slug: 'digital-marketing-executive',
    title: 'Digital Marketing Executive',
    experience: '2–5 years',
    location: 'Bengaluru',
    summary: 'Build digital visibility and demand-generation programs for AionSi in the semiconductor technology market.',
    responsibilities: [
      'Execute digital marketing programs across relevant channels.',
      'Create and coordinate semiconductor-focused content and campaigns.',
      'Support lead generation, analytics and campaign performance tracking.',
    ],
    skills: ['Digital Marketing', 'B2B Technology Marketing', 'Content & Campaigns', 'Semiconductor / Technology'],
  },
  {
    slug: 'physical-verification-engineer',
    title: 'Physical Verification Engineer',
    experience: '5–8 years',
    location: 'Bengaluru and Hyderabad',
    summary: 'Own sign-off physical verification for advanced-node designs and ensure tape-out-ready quality.',
    responsibilities: [
      'Perform DRC, LVS and ERC verification for advanced technology nodes.',
      'Drive physical sign-off checks and closure toward tape-out.',
      'Work closely with design, layout and foundry teams to resolve verification issues.',
    ],
    skills: ['DRC', 'LVS', 'ERC', 'Physical Sign-off', 'Advanced Technology Nodes'],
  },
  {
    slug: 'dv-engineer',
    title: 'DV Engineer',
    experience: '5+ years',
    location: 'Bengaluru',
    summary: 'Develop and debug UVM-based verification environments and drive regression and coverage closure.',
    responsibilities: [
      'Develop and maintain UVM testbenches.',
      'Debug regressions and verification failures.',
      'Drive functional coverage closure and verification deliverables.',
    ],
    skills: ['SystemVerilog', 'UVM', 'AMBA Protocols', 'Regression Debug', 'Coverage Closure'],
  },
  {
    slug: 'physical-design-iii',
    title: 'Physical Design III',
    experience: '5+ years',
    location: 'Bengaluru',
    summary: 'Own physical-design execution from planning through tape-out, including implementation, verification, reviews and technical leadership.',
    responsibilities: [
      'Deliver fully verified physical designs at IP and top-level.',
      'Manage the physical-design phase from planning and requirements through tape-out.',
      'Own documentation, reviews, quality, progress and technical coordination.',
      'Lead physical designers and participate in improvement and knowledge-driven meetings.',
    ],
    skills: ['Cadence', 'Virtuoso', 'Physical Design', 'High Frequency / mmWave', 'Technical Leadership'],
  },
  {
    slug: 'dft-engineer',
    title: 'DFT Engineer',
    experience: '4+ years',
    location: 'Location to be confirmed',
    summary: 'Execute DFT insertion, MBIST, JTAG, ATPG and manufacturing-test verification flows.',
    responsibilities: [
      'Hands-on MBIST and JTAG insertion.',
      'Pattern generation and simulation.',
      'RTL DFT insertion using Siemens Tessent-based flows.',
      'Verification for MBIST, repair and boundary-scan tests.',
      'Support scan and ATPG activities.',
    ],
    skills: ['MBIST', 'JTAG', 'ATPG', 'Scan', 'Siemens Tessent', 'DFT Verification'],
  },
];

export const careerDisciplines = [
  'SoC Design Verification',
  'Emulation',
  'Physical Verification',
  'Design Verification',
  'Physical Design',
  'DFT',
  'Digital Marketing for Semiconductor Technology',
];
