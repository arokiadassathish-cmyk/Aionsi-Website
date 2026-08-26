import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ status: 'ok', service: 'aionsi-gallery', storage: 'hostinger-persistent-placeholder' }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
