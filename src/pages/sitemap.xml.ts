const technologyEvidenceRoutes = [
  '/evidence/pcie-gen6-data-link-layer',
  '/evidence/usb-3x-usb4-controllers',
  '/evidence/ddr4-ddr5-memory-controllers',
  '/evidence/hbm2e-hbm3-memory-controllers',
  '/evidence/amba-chi-axi-interconnect-fabrics',
  '/evidence/risc-v-processor-core-family',
  '/evidence/tarang-soc-engineering-experience',
  '/evidence/opentitan-cryptography-secure-soc',
];

const routes = [
  '/',
  '/capabilities',
  '/capabilities/rtl-design',
  '/capabilities/design-verification',
  '/capabilities/physical-design',
  '/capabilities/dft',
  '/capabilities/analog-layout',
  '/capabilities/protocol-verification',
  '/capabilities/soc-ip-engineering',
  '/solutions/dedicated-engineering',
  '/solutions/extended-engineering',
  '/solutions/odc',
  '/solutions/project-engineering',
  '/solutions/aiv',
  '/contact',
  '/careers',
  '/insights',
  '/insights/when-a-display-becomes-a-computing-platform',
  '/news',
  '/blogs',
  '/experience',
  '/evidence',
  '/cadence',
  '/oppstar',
  '/greatasic',
  '/infinecs',
  '/panache',
  '/target-accounts',
  ...technologyEvidenceRoutes,
];

const normalizePath = (route) => route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;

export const GET = () => {
  const urls = routes
    .map((route) => `  <url><loc>https://aionsi.com${normalizePath(route)}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
