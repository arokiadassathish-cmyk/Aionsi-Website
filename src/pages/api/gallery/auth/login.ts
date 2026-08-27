import type { APIRoute } from 'astro';
import { isGalleryAdminConfigured, setGalleryAdminSession, validateGalleryAdminCredentials } from '../../../../lib/galleryAdmin';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isGalleryAdminConfigured()) {
    return new Response(JSON.stringify({ ok: false, error: 'Gallery admin authentication is not configured.' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request.' }), {
      status: 400,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  if (!validateGalleryAdminCredentials(body.username ?? '', body.password ?? '')) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid credentials.' }), {
      status: 401,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  setGalleryAdminSession({ cookies } as any);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
