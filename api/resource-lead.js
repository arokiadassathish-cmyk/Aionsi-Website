import { captureLead, jsonError } from './_lib/lead-capture.js';

const resources = {
  'presilicon-checklist': 'Pre-Silicon Verification Sign-off Checklist',
  'pcie-readiness-guide': 'PCIe Verification Readiness Guide',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export default {
  async fetch(request) {
    if (request.method === 'GET') {
      return json({
        ok: true,
        service: 'resource-lead-capture',
        runtime: 'vercel-function',
        configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, message: 'Method not allowed.' }, 405);
    }

    let input;
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
  },
};
