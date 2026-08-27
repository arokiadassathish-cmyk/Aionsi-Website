import type { APIRoute } from 'astro';
import { hasGalleryAdminSession, isGalleryAdminConfigured } from '../../../../lib/galleryAdmin';

export const GET: APIRoute = (context) => {
  return new Response(JSON.stringify({
    configured: isGalleryAdminConfigured(),
    authenticated: hasGalleryAdminSession(context),
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
