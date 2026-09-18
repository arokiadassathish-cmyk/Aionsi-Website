import { createHmac, timingSafeEqual } from 'node:crypto';

export const CAMPAIGN_SESSION_COOKIE = 'aionsi_campaign_session';

function expectedKey(): string | undefined {
  return process.env.AIONSI_AGENT_RUNNER_KEY;
}

export function createCampaignSessionToken(): string | null {
  const key = expectedKey();
  if (!key) return null;
  return createHmac('sha256', key).update('aionsi-campaign-ui-v1').digest('hex');
}

export function isCampaignSessionValid(token: string | undefined): boolean {
  const expected = createCampaignSessionToken();
  if (!expected || !token) return false;
  const actual = Buffer.from(token);
  const wanted = Buffer.from(expected);
  return actual.length === wanted.length && timingSafeEqual(actual, wanted);
}

export function isCampaignRequestAuthorized(request: Request): boolean {
  const expected = expectedKey();
  const header = request.headers.get('x-aionsi-agent-key');
  if (expected && header === expected) return true;
  const cookie = request.headers.get('cookie') ?? '';
  const match = cookie.match(/aionsi_campaign_session=([^;]+)/);
  return isCampaignSessionValid(match?.[1]);
}