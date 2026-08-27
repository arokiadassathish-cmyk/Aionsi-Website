import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

const storageRoot = process.env.GALLERY_STORAGE_ROOT || path.resolve(process.cwd(), 'var', 'gallery-media');

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    await fs.mkdir(storageRoot, { recursive: true });
    const probe = path.join(storageRoot, `.write-probe-${process.pid}`);
    await fs.writeFile(probe, new Date().toISOString(), 'utf8');
    await fs.unlink(probe);

    return new Response(JSON.stringify({
      status: 'ok',
      writable: true,
      storageConfigured: Boolean(process.env.GALLERY_STORAGE_ROOT),
      storageRoot: process.env.GALLERY_STORAGE_ROOT ? 'configured' : 'default-app-path',
      note: 'Persistent media storage is writable. Authenticated gallery upload APIs are enabled.'
    }), { status: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      writable: false,
      storageConfigured: Boolean(process.env.GALLERY_STORAGE_ROOT),
      message: error instanceof Error ? error.message : 'Storage check failed'
    }), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
  }
};
