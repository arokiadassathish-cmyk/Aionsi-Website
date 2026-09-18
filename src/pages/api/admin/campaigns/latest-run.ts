import type { APIRoute } from 'astro';
import { isCampaignRequestAuthorized } from '../../../../lib/campaignAuth';
import { loadLatestDailyCampaignRun } from '../../../../data/dailyCampaignRunStore';

export const prerender = false;

function authorized(request: Request): boolean {
  return isCampaignRequestAuthorized(request);
}

export const GET: APIRoute = async ({ request }) => {
  if (!authorized(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const run = await loadLatestDailyCampaignRun();
  return new Response(JSON.stringify({ run }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
