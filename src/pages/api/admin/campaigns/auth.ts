import type { APIRoute } from 'astro';
import { CAMPAIGN_SESSION_COOKIE, createCampaignSessionToken } from '../../../../lib/campaignAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const expected = process.env.AIONSI_AGENT_RUNNER_KEY;
  const form = await request.formData().catch(() => null);
  const key = String(form?.get('key') ?? '');
  if (!expected || !key || key !== expected) return new Response('Unauthorized', { status: 401 });
  const token = createCampaignSessionToken();
  if (!token) return new Response('Campaign authentication is not configured.', { status: 503 });
  cookies.set(CAMPAIGN_SESSION_COOKIE, token, { httpOnly: true, secure: import.meta.env.PROD, sameSite: 'strict', path: '/admin/campaigns', maxAge: 60 * 60 * 12 });
  return Response.redirect(new URL('/admin/campaigns', request.url), 303);
};