import type { APIRoute } from 'astro';
import { clearGalleryAdminSession } from '../../../../lib/galleryAdmin';

export const POST: APIRoute = ({ cookies }) => {
  clearGalleryAdminSession({ cookies } as any);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
