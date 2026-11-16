export const prerender = false;

export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'aionsi-website',
      runtime: 'astro-node',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    },
  );
}
