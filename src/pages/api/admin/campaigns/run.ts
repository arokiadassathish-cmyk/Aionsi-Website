import type { APIRoute } from 'astro';
import { runDailyCampaign, type DailyCampaignTarget } from '../../../../agents/dailyCampaignRuntime';
import { parseConfiguredTargetAccounts } from '../../../../data/configuredTargetAccounts';
import { createHubSpotFetchTransport, createHubSpotApiAdapter } from '../../../../integrations/hubspotRuntime';
import { resolveLiveResearchProvider } from '../../../../integrations/liveResearchProviderConfig';
import { createDailyCampaignResearchProvider } from '../../../../integrations/dailyCampaignResearchProvider';
import { saveDailyCampaignRun } from '../../../../data/dailyCampaignRunStore';

export const prerender = false;

function authorized(request: Request): boolean {
  const expected = process.env.AIONSI_AGENT_RUNNER_KEY;
  return Boolean(expected && request.headers.get('x-aionsi-agent-key') === expected);
}

function parseTargets(): DailyCampaignTarget[] {
  return parseConfiguredTargetAccounts(process.env.AIONSI_DAILY_TARGETS_JSON);
}

export const POST: APIRoute = async ({ request }) => {
  if (!authorized(request)) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });

  try {
    const body = await request.json().catch(() => ({}));
    // Explicit request targets remain available for controlled testing, but the
    // normal scheduled path always reads the configured AionSi registry-backed list.
    const targets = Array.isArray(body?.targets)
      ? parseConfiguredTargetAccounts(JSON.stringify(body.targets))
      : parseTargets();
    if (!targets.length) throw new Error('No AionSi target accounts are configured.');

    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!accessToken) throw new Error('HUBSPOT_ACCESS_TOKEN is not configured.');

    const hubspot = createHubSpotApiAdapter(createHubSpotFetchTransport({ accessToken }));
    const canonicalProvider = resolveLiveResearchProvider();
    if (!canonicalProvider) throw new Error('Live research provider is not configured.');

    const result = await runDailyCampaign(
      hubspot,
      createDailyCampaignResearchProvider(canonicalProvider),
      targets,
      { maxTargetsPerRun: Number(process.env.AIONSI_DAILY_MAX_TARGETS || 25) },
      'dry_run',
    );

    await saveDailyCampaignRun(result);
    return new Response(JSON.stringify(result), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Daily campaign run failed.' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
