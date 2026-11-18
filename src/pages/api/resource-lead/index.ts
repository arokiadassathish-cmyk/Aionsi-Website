import type { APIRoute } from 'astro';
import { captureLead, jsonError } from '../../../lib/lead-capture';

export const prerender = false;

const resources: Record<string, string> = {
  'presilicon-checklist': 'Pre-Silicon Verification Sign-off Checklist',
  'pcie-readiness-guide': 'PCIe Verification Readiness Guide',
};

export const GET: APIRoute = async () => new Response(JSON.stringify({
  ok: true,
  service: 'resource-lead-capture',
  provider: 'supabase-resend',
  configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
}), { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request }) => {
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return jsonError('The submitted form is too large.', 413);
    input = JSON.parse(raw);
  } catch {
    return jsonError('Please submit the form again.', 400);
  }

  const resourceId = typeof input.resource_id === 'string' ? input.resource_id : '';
  if (!resources[resourceId]) return jsonError('Please select a valid resource.', 400);
  return captureLead(request, input, {
    source: 'website-resource-download',
    resourceSlug: resources[resourceId],
    requireConsent: true,
  });
};
