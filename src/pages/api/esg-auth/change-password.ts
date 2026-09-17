import type { APIRoute } from 'astro';
import crypto from 'node:crypto';

export const prerender = false;

function equalsSecret(value: string | undefined, expected: string | undefined) {
  if (!value || !expected) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get('aionsi_esg_session')?.value;
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized.' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }

  try {
    const body = await request.json() as { currentPassword?: string; newPassword?: string };
    const configuredPassword = import.meta.env.ESG_ADMIN_PASSWORD;

    if (!equalsSecret(body.currentPassword, configuredPassword)) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect.' }), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (!body.newPassword || body.newPassword.length < 12) {
      return new Response(JSON.stringify({ error: 'New password must contain at least 12 characters.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      error: 'Password rotation requires updating the ESG_ADMIN_PASSWORD deployment secret in Vercel before the new password can take effect.'
    }), {
      status: 501,
      headers: { 'content-type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }
};
