import type { AionSiCapability } from './matchAgent';

export const aionSiMatchCapabilities: AionSiCapability[] = [
  {
    id: 'design-verification',
    name: 'Design Verification',
    description: 'Functional verification, UVM-based environments, subsystem and SoC verification.',
    evidenceRefs: ['WP-001', 'WP-PCIe5-DL'],
    keywords: ['verification', 'uvm', 'dv', 'design verification', 'soc verification', 'subsystem'],
  },
  {
    id: 'rtl-front-end-design',
    name: 'RTL & Front-End Design',
    description: 'RTL, microarchitecture implementation and front-end engineering for SoC and IP programs.',
    evidenceRefs: ['CORE-RTL-FE'],
    keywords: ['rtl', 'front end', 'frontend', 'logic design', 'microarchitecture', 'asic design'],
  },
  {
    id: 'soc-integration',
    name: 'SoC Integration',
    description: 'Multi-subsystem integration, interface verification and top-level SoC engineering.',
    evidenceRefs: ['WP-001'],
    keywords: ['soc integration', 'integration', 'multi subsystem', 'interface', 'chip integration'],
  },
  {
    id: 'physical-design',
    name: 'Physical Design',
    description: 'Physical implementation, timing closure and sign-off support for advanced-node SoCs.',
    evidenceRefs: ['PD-SIGNOFF-001'],
    keywords: ['physical design', 'place and route', 'pnr', 'timing closure', 'signoff', 'advanced node', '7nm', '5nm', '4nm'],
  },
  {
    id: 'dft',
    name: 'DFT',
    description: 'Design-for-test planning, implementation and sign-off support.',
    evidenceRefs: ['DFT-SIGNOFF-001'],
    keywords: ['dft', 'design for test', 'scan', 'atpg', 'test engineering'],
  },
  {
    id: 'high-speed-interface-verification',
    name: 'High-Speed Interface Verification',
    description: 'Verification support for protocols such as PCIe, USB, DDR/LPDDR, HBM and related interfaces.',
    evidenceRefs: ['WP-PCIe5-DL', 'WP-HBM4E'],
    keywords: ['pcie', 'usb', 'ddr', 'lpddr', 'hbm', 'interface verification', 'data link layer'],
  },
  {
    id: 'low-power-verification',
    name: 'Low-Power Verification',
    description: 'Power-aware simulation and verification for low-power SoC and interface designs.',
    evidenceRefs: ['WP-UFS4-LP'],
    keywords: ['low power', 'power aware', 'ufs', 'power-aware simulation'],
  },
];
