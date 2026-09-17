import type { APIRoute } from 'astro';
import crypto from 'node:crypto';

export const prerender = false;

type Credentials = {
  username?: string;
  password?: string;
};

function isValidCredential(value: string | undefined, expected: string | undefined) {
  if (!value || !expected) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = (await request.json()) as Credentials;
    const expectedUsername = import.meta.env.ESG_ADMIN_USERNAME;
    const expectedPassword = import.meta.env.ESG_ADMIN_PASSWORD;

    if (!isValidCredential(body.username?.trim(), expectedUsername) || !isValidCredential(body.password, expectedPassword)) {
      return new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 8 * 60 * 60 * 1000);

    cookies.set('aionsi_esg_session', token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      path: '/',
      expires
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }
};
