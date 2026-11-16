import resourceLeadHandler from '../../../../api/resource-lead.js';

export const prerender = false;

export async function GET() {
  return resourceLeadHandler.fetch(new Request('https://aionsi.com/api/resource-lead', { method: 'GET' }));
}

export async function POST({ request }) {
  return resourceLeadHandler.fetch(request);
}
