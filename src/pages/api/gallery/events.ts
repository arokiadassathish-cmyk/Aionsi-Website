import type { APIRoute } from 'astro';
import { hasGalleryAdminSession } from '../../../lib/galleryAdmin';
import { createGalleryEvent, getGalleryEvent, readGalleryEvents, updateGalleryEvent } from '../../../lib/galleryStorage';

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const GET: APIRoute = async ({ cookies }) => {
  if (!hasGalleryAdminSession({ cookies } as any)) return json({ ok: false, error: 'Unauthorized.' }, 401);
  try { return json({ ok: true, events: await readGalleryEvents() }); }
  catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Unable to read events.' }, 500); }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!hasGalleryAdminSession({ cookies } as any)) return json({ ok: false, error: 'Unauthorized.' }, 401);
  try {
    const body = await request.json();
    const event = await createGalleryEvent({
      title: String(body.title || ''),
      category: body.category,
      date: String(body.date || ''),
      location: String(body.location || ''),
      description: String(body.description || ''),
      published: false,
      ...(body.slug ? { slug: String(body.slug) } : {}),
    });
    return json({ ok: true, event }, 201);
  } catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create event.' }, 400); }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!hasGalleryAdminSession({ cookies } as any)) return json({ ok: false, error: 'Unauthorized.' }, 401);
  try {
    const body = await request.json();
    const slug = String(body.slug || '');
    if (!await getGalleryEvent(slug)) return json({ ok: false, error: 'Event not found.' }, 404);
    const patch: Record<string, unknown> = {};
    for (const key of ['title', 'category', 'date', 'location', 'description', 'published']) if (key in body) patch[key] = body[key];
    return json({ ok: true, event: await updateGalleryEvent(slug, patch) });
  } catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Unable to update event.' }, 400); }
};
