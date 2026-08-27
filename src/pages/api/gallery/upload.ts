import type { APIRoute } from 'astro';
import { hasGalleryAdminSession } from '../../../lib/galleryAdmin';
import { addMediaToEvent, getGalleryEvent, saveGalleryFile, setEventCover } from '../../../lib/galleryStorage';

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!hasGalleryAdminSession({ cookies } as any)) return json({ ok: false, error: 'Unauthorized.' }, 401);
  try {
    const form = await request.formData();
    const slug = String(form.get('eventSlug') || '');
    const kind = String(form.get('kind') || 'media');
    if (!slug) return json({ ok: false, error: 'Event is required.' }, 400);
    if (!await getGalleryEvent(slug)) return json({ ok: false, error: 'Event not found.' }, 404);

    const values = form.getAll('files').filter((value): value is File => value instanceof File && value.size > 0);
    if (!values.length) return json({ ok: false, error: 'Select at least one file.' }, 400);
    if (kind === 'cover' && values.length !== 1) return json({ ok: false, error: 'Select exactly one cover image.' }, 400);
    if (kind === 'cover' && !values[0].type.startsWith('image/')) return json({ ok: false, error: 'Cover image must be JPG, PNG or WebP.' }, 400);

    const uploaded = [];
    for (const file of values) {
      const saved = await saveGalleryFile(slug, file);
      uploaded.push(saved);
      if (kind === 'cover') {
        await setEventCover(slug, saved.src);
      } else {
        await addMediaToEvent(slug, { type: saved.type, src: saved.src, alt: file.name, caption: '' });
      }
    }
    return json({ ok: true, kind, files: uploaded });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : 'Upload failed.' }, 400);
  }
};
