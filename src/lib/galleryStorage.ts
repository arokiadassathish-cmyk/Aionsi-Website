import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import type { GalleryEvent, GalleryMedia } from '../data/eventGallery';

export const STORAGE_ROOT = process.env.GALLERY_STORAGE_ROOT || path.resolve(process.cwd(), 'var', 'gallery-media');
const MANIFEST_PATH = path.join(STORAGE_ROOT, 'gallery-manifest.json');

export type StoredGalleryEvent = GalleryEvent;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function safeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').slice(0, 160);
}

async function ensureStorage() {
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
}

export async function readGalleryEvents(): Promise<StoredGalleryEvent[]> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: any) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeGalleryEvents(events: StoredGalleryEvent[]) {
  await ensureStorage();
  const temp = `${MANIFEST_PATH}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(events, null, 2), 'utf8');
  await fs.rename(temp, MANIFEST_PATH);
}

export async function createGalleryEvent(input: Omit<StoredGalleryEvent, 'slug' | 'cover' | 'media'> & { slug?: string }) {
  const events = await readGalleryEvents();
  const base = slugify(input.slug || input.title);
  if (!base) throw new Error('A valid event title or slug is required.');
  if (events.some((event) => event.slug === base)) throw new Error('An event with this slug already exists.');

  const event: StoredGalleryEvent = {
    slug: base,
    title: input.title.trim(),
    category: input.category,
    date: input.date.trim(),
    location: input.location.trim(),
    description: input.description.trim(),
    cover: '',
    media: [],
    published: Boolean(input.published),
  };
  if (!event.title || !event.date || !event.location || !event.description) throw new Error('Title, date, location and description are required.');

  await writeGalleryEvents([...events, event]);
  await ensureStorage();
  await fs.mkdir(path.join(STORAGE_ROOT, base), { recursive: true });
  return event;
}

export async function updateGalleryEvent(slug: string, patch: Partial<StoredGalleryEvent>) {
  const events = await readGalleryEvents();
  const index = events.findIndex((event) => event.slug === slug);
  if (index < 0) throw new Error('Event not found.');
  events[index] = { ...events[index], ...patch, slug };
  await writeGalleryEvents(events);
  return events[index];
}

export async function getGalleryEvent(slug: string) {
  const events = await readGalleryEvents();
  return events.find((event) => event.slug === slug);
}

export async function getPublishedGalleryEvents() {
  return (await readGalleryEvents()).filter((event) => event.published);
}

export function mediaUrl(slug: string, filename: string) {
  return `/api/gallery/media/${encodeURIComponent(slug)}/${encodeURIComponent(filename)}`;
}

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm']);
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 250 * 1024 * 1024;

export function validateUpload(file: File) {
  const isImage = IMAGE_TYPES.has(file.type);
  const isVideo = VIDEO_TYPES.has(file.type);
  if (!isImage && !isVideo) throw new Error('Unsupported media type. Use JPG, PNG, WebP, MP4 or WebM.');
  const max = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (file.size > max) throw new Error(`${isImage ? 'Image' : 'Video'} exceeds the ${Math.round(max / 1024 / 1024)} MB limit.`);
  return isVideo ? 'video' : 'image';
}

export async function saveGalleryFile(slug: string, file: File) {
  const type = validateUpload(file);
  const event = await getGalleryEvent(slug);
  if (!event) throw new Error('Event not found. Create the event before uploading media.');

  const dir = path.join(STORAGE_ROOT, safeSegment(slug));
  await fs.mkdir(dir, { recursive: true });
  const original = safeSegment(path.basename(file.name)) || 'upload';
  const ext = path.extname(original).toLowerCase();
  const stem = path.basename(original, ext).slice(0, 80) || 'media';
  const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${stem}${ext}`;
  const destination = path.join(dir, filename);
  await fs.writeFile(destination, Buffer.from(await file.arrayBuffer()));
  return { type, filename, src: mediaUrl(slug, filename), bytes: file.size, mimeType: file.type } as const;
}

export async function addMediaToEvent(slug: string, media: GalleryMedia) {
  const event = await getGalleryEvent(slug);
  if (!event) throw new Error('Event not found.');
  const updated = await updateGalleryEvent(slug, { media: [...event.media, media] });
  return updated;
}

export async function setEventCover(slug: string, cover: string) {
  return updateGalleryEvent(slug, { cover });
}

export async function deleteGalleryFile(slug: string, filename: string) {
  const cleanSlug = safeSegment(slug);
  const cleanFilename = safeSegment(path.basename(filename));
  const root = path.resolve(STORAGE_ROOT, cleanSlug);
  const target = path.resolve(root, cleanFilename);
  if (!target.startsWith(`${root}${path.sep}`)) throw new Error('Invalid media path.');
  await fs.unlink(target);
}

export function contentTypeForFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm' } as Record<string, string>)[ext] || 'application/octet-stream';
}
