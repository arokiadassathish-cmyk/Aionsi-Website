import type { APIRoute } from 'astro';
import { captureLead, jsonError } from '../../lib/lead-capture';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let input: Record<string, unknown>;
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
};
