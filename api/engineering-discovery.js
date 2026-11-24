import { captureLead, jsonError } from '../src/lib/lead-capture.ts';

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

    return captureLead(request, input, {
      source: 'website-engineering-discovery',
      requireConsent: false,
    });
  },
};
