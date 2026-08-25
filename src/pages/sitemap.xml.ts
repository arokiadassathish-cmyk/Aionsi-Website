import type { APIRoute } from 'astro';

const site = 'https://aionsi.com';
const routes = [
  '/',
  '/capabilities',
  '/experience',
  '/evidence',
  '/industries',
  '/insights',
  '/insights/technical-papers',
  '/blogs',
  '/customers',
  '/leadership',
  '/careers',
  '/contact',
  '/aionsi-ip'
];

export const GET: APIRoute = () => {
  const urls = routes
    .map((path) => `  <url><loc>${site}${path === '/' ? '/' : `${path}/`}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
