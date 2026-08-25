import type { APIRoute } from 'astro';

const routes = [
  '/',
  '/capabilities',
  '/technology',
  '/industries',
  '/solutions',
  '/experience',
  '/leadership',
  '/insights',
  '/insights/technical-papers',
  '/blogs',
  '/customers',
  '/careers',
  '/contact',
  '/aionsi-ip',
  '/evidence',
  '/proof',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://aionsi.com');
  const urls = routes.map((route) => `<url><loc>${new URL(route, origin).toString()}</loc></url>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
