export type TechnologyEvidenceStrength = 'strong';

export interface TechnologyEvidence {
  slug: string;
  number: string;
  title: string;
  summary: string;
  evidenceStrength: TechnologyEvidenceStrength;
  proofPoints: string[];
  sourceLabel: string;
  detailHref: string;
}

/**
 * Only technologies supported by the supplied AionSi technical capability documents.
 * Keep this dataset intentionally conservative: no DFT, standalone AI-accelerator silicon,
 * or standalone physical-design claims are included here without equivalent source evidence.
 */
export const technologyEvidence: TechnologyEvidence[] = [
  {
    slug: 'pcie-gen6', number: '01', title: 'PCIe Gen6',
    summary: 'Production-grade Data Link Layer engineering with link training, flow control, error recovery, power management and SoC integration.',
    evidenceStrength: 'strong',
    proofPoints: ['64 GT/s Gen6 per lane', 'Gen3 / Gen4 / Gen5 backward compatibility', 'UVM/SystemVerilog verification with >95% coverage targets', 'Synthesizable RTL, PIPE PHY integration and APB/AXI configuration', 'Production-proven and tapeout-backed positioning'],
    sourceLabel: 'PCIe Gen6 Data Link Layer — Technical Capabilities Overview',
    detailHref: '/evidence/pcie-gen6-data-link-layer',
  },
  {
    slug: 'usb-3x-usb4', number: '02', title: 'USB 3.x / USB4',
    summary: 'Integrated USB controller engineering spanning PHY, link and protocol layers, power delivery, error recovery and host/device integration.',
    evidenceStrength: 'strong',
    proofPoints: ['USB 3.2 Gen 2x2 at 20 Gbps and USB4 at 40 Gbps', 'Host and device modes', 'UVM verification with USB-IF compliance scenarios', 'Synthesizable Verilog with APB/AXI integration', 'Power Delivery and low-power state management'],
    sourceLabel: 'USB 3.x & USB4 Controllers — Technical Capabilities Overview',
    detailHref: '/evidence/usb-3x-usb4-controllers',
  },
  {
    slug: 'ddr4-ddr5', number: '03', title: 'DDR4 / DDR5',
    summary: 'Memory-controller engineering covering command scheduling, PHY abstraction, refresh management, ECC/RAS, timing and SoC integration.',
    evidenceStrength: 'strong',
    proofPoints: ['Up to 7.2 Gbps per pin for DDR5', 'Up to 8 channels', 'SECDED and optional Chipkill ECC', 'UVM verification across timing, refresh, power and PVT corners', 'AXI / CHI and DFI-based integration'],
    sourceLabel: 'DDR4 & DDR5 Memory Controllers — Technical Capabilities Overview',
    detailHref: '/evidence/ddr4-ddr5-memory-controllers',
  },
  {
    slug: 'hbm2e-hbm3', number: '04', title: 'HBM2e / HBM3',
    summary: 'High-bandwidth memory controller engineering for AI, GPU and HPC systems with QoS-aware scheduling and thermal-aware integration.',
    evidenceStrength: 'strong',
    proofPoints: ['14.4 / 17.1 Gbps per pin', '1.8–2.4 TB/s per stack', '8–16 AXI/CHI client ports', 'High-bandwidth, thermal-transient and contention verification', '7nm / 5nm / 3nm implementation compatibility'],
    sourceLabel: 'HBM2e & HBM3 Memory Controllers — Technical Capabilities Overview',
    detailHref: '/evidence/hbm2e-hbm3-memory-controllers',
  },
  {
    slug: 'amba-chi-axi', number: '05', title: 'AMBA CHI / AXI',
    summary: 'Coherent and non-coherent interconnect engineering for heterogeneous SoCs with QoS, configurable topology, monitoring and scalable agent counts.',
    evidenceStrength: 'strong',
    proofPoints: ['CHI-E/D with 8–32 coherent agents', '16+ AXI clients with QoS prioritization', 'Crossbar, tree and ring topologies', 'UVM compliance and coherency verification with >93% coverage', 'Multi-voltage, debug/trace and heterogeneous compute integration'],
    sourceLabel: 'AMBA CHI & AXI Interconnect Fabrics — Technical Capabilities Overview',
    detailHref: '/evidence/amba-chi-axi-interconnect-fabrics',
  },
  {
    slug: 'risc-v', number: '06', title: 'RISC-V',
    summary: 'Processor-core engineering spanning embedded, edge-AI, performance and multi-core cluster tiers with formal and dynamic verification.',
    evidenceStrength: 'strong',
    proofPoints: ['RV32I / RV64I with optional Vector, Floating-Point and Crypto extensions', '2–8 core cluster configurations', 'AXI / CHI coherent memory interfaces', 'Formal + constrained-random verification', 'JTAG/DTM and standard software-toolchain integration'],
    sourceLabel: 'RISC-V Processor Core Family — Technical Capabilities Overview',
    detailHref: '/evidence/risc-v-processor-core-family',
  },
];

export const getTechnologyEvidence = (slug: string) => technologyEvidence.find((item) => item.slug === slug);
