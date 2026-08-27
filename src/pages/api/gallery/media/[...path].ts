import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { contentTypeForFilename, STORAGE_ROOT } from '../../../../lib/galleryStorage';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const segments = String(params.path || '').split('/').filter(Boolean);
  if (segments.length < 2 || segments.some((segment) => segment === '.' || segment === '..')) return new Response('Not found', { status: 404 });
  const root = path.resolve(STORAGE_ROOT);
  const target = path.resolve(root, ...segments);
  if (!target.startsWith(`${root}${path.sep}`)) return new Response('Not found', { status: 404 });

  try {
    const stat = await fs.stat(target);
    if (!stat.isFile()) return new Response('Not found', { status: 404 });
    const type = contentTypeForFilename(target);
    const range = request.headers.get('range');
    const headers = new Headers({ 'content-type': type, 'cache-control': 'public, max-age=31536000, immutable', 'accept-ranges': 'bytes' });

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (match) {
        const start = match[1] ? Number(match[1]) : Math.max(0, stat.size - Number(match[2] || 0));
        const end = match[2] ? Math.min(stat.size - 1, Number(match[2])) : stat.size - 1;
        if (Number.isFinite(start) && Number.isFinite(end) && start >= 0 && start <= end && start < stat.size) {
          const length = end - start + 1;
          const handle = await fs.open(target, 'r');
          const buffer = Buffer.alloc(length);
          await handle.read(buffer, 0, length, start);
          await handle.close();
          headers.set('content-length', String(length));
          headers.set('content-range', `bytes ${start}-${end}/${stat.size}`);
          return new Response(buffer, { status: 206, headers });
        }
      }
    }

    headers.set('content-length', String(stat.size));
    return new Response(await fs.readFile(target), { status: 200, headers });
  } catch (error: any) {
    if (error?.code === 'ENOENT') return new Response('Not found', { status: 404 });
    return new Response('Media unavailable', { status: 500 });
  }
};
