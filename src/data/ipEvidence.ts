export interface IpEvidence {
  slug: string;
  number: string;
  title: string;
  family: 'Connectivity' | 'Interconnect' | 'Memory' | 'Compute';
  summary: string;
  detailHref: string;
  sourceLabel: string;
}

/**
 * Evidence-backed AionSi IP engineering families derived from the supplied technical capability documents.
 * This dataset describes engineering and integration capability; it does not imply standalone IP ownership or licensing unless separately validated.
 */
export const ipEvidence: IpEvidence[] = [
  {
    slug: 'pcie-gen6',
    number: '01',
    title: 'PCIe Gen6',
    family: 'Connectivity',
    summary: 'Data Link Layer engineering covering link training, flow control, error recovery, power management, PIPE integration and SoC connectivity.',
    detailHref: '/evidence/pcie-gen6-data-link-layer',
    sourceLabel: 'PCIe Gen6 Data Link Layer — Technical Capabilities Overview',
  },
  {
    slug: 'usb-3x-usb4',
    number: '02',
    title: 'USB 3.x / USB4',
    family: 'Connectivity',
    summary: 'Controller engineering spanning PHY, link and protocol layers, host/device modes, power delivery and error recovery.',
    detailHref: '/evidence/usb-3x-usb4-controllers',
    sourceLabel: 'USB 3.x & USB4 Controllers — Technical Capabilities Overview',
  },
  {
    slug: 'amba-chi-axi',
    number: '03',
    title: 'AMBA CHI / AXI',
    family: 'Interconnect',
    summary: 'Coherent and non-coherent fabric engineering for heterogeneous SoCs, including QoS, topology selection, monitoring and scalable agent integration.',
    detailHref: '/evidence/amba-chi-axi-interconnect-fabrics',
    sourceLabel: 'AMBA CHI & AXI Interconnect Fabrics — Technical Capabilities Overview',
  },
  {
    slug: 'ddr4-ddr5',
    number: '04',
    title: 'DDR4 / DDR5',
    family: 'Memory',
    summary: 'Memory-controller engineering spanning command scheduling, refresh, ECC/RAS, PHY integration, timing and SoC interfaces.',
    detailHref: '/evidence/ddr4-ddr5-memory-controllers',
    sourceLabel: 'DDR4 & DDR5 Memory Controllers — Technical Capabilities Overview',
  },
  {
    slug: 'hbm2e-hbm3',
    number: '05',
    title: 'HBM2e / HBM3',
    family: 'Memory',
    summary: 'High-bandwidth memory-controller engineering with multi-client arbitration, QoS, thermal management and AXI/CHI integration.',
    detailHref: '/evidence/hbm2e-hbm3-memory-controllers',
    sourceLabel: 'HBM2e & HBM3 Memory Controllers — Technical Capabilities Overview',
  },
  {
    slug: 'risc-v',
    number: '06',
    title: 'RISC-V',
    family: 'Compute',
    summary: 'Processor-core engineering spanning embedded, edge-AI, performance and cluster tiers with formal/dynamic verification and AXI/CHI integration.',
    detailHref: '/evidence/risc-v-processor-core-family',
    sourceLabel: 'RISC-V Processor Core Family — Technical Capabilities Overview',
  },
];

export const getIpEvidence = (slug: string) => ipEvidence.find((item) => item.slug === slug);
