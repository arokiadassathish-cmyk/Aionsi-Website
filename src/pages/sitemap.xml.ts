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
];

export const GET = () => {
  const urls = routes.map((route) => `  <url><loc>https://aionsi.com${route}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
