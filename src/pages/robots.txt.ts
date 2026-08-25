import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://aionsi.com');
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', origin)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
