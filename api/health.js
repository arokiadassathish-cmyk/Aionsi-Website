export default {
  async fetch() {
    return new Response(JSON.stringify({
      status: 'ok',
      service: 'aionsi-website',
      runtime: 'vercel-function',
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  },
};
