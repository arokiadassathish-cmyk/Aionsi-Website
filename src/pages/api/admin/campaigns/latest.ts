import type { APIRoute } from 'astro';
import { loadLatestDailyCampaignRun } from '../../../../data/dailyCampaignRunStore';

export const prerender = false;

function authorized(request: Request): boolean {
  const expected = process.env.AIONSI_AGENT_RUNNER_KEY;
  return Boolean(expected && request.headers.get('x-aionsi-agent-key') === expected);
}

export const GET: APIRoute = async ({ request }) => {
  if (!authorized(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
  const result = await loadLatestDailyCampaignRun();
  return new Response(JSON.stringify({ result }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
};
