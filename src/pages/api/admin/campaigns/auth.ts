import type { APIRoute } from 'astro';
import { CAMPAIGN_SESSION_COOKIE, createCampaignSessionToken } from '../../../../lib/campaignAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const expected = process.env.AIONSI_AGENT_RUNNER_KEY;

  // Use JSON for this authentication endpoint. Astro's built-in CSRF origin
  // check applies to browser form-encoded POSTs, and can reject legitimate
  // requests behind a reverse proxy when the public and upstream origins differ.
  const body = await request.json().catch(() => null);
  const key = typeof body?.key === 'string' ? body.key : '';

  if (!expected || !key || key !== expected) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const token = createCampaignSessionToken();
  if (!token) {
    return Response.json(
      { ok: false, error: 'Campaign authentication is not configured.' },
      { status: 503 },
    );
  }

  cookies.set(CAMPAIGN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    // The session is used by both /admin/campaigns and its /api endpoints.
    // /admin/campaigns would not match /api/admin/campaigns/run.
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ ok: true, redirect: '/admin/campaigns' });
};
