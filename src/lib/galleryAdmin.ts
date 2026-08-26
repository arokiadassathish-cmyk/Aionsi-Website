import type { APIContext } from 'astro';

const COOKIE_NAME = 'aionsi_gallery_admin';

function getConfiguredPassword() {
  return process.env.GALLERY_ADMIN_PASSWORD?.trim() || '';
}

function getConfiguredSessionToken() {
  return process.env.GALLERY_ADMIN_SESSION_TOKEN?.trim() || '';
}

export function isGalleryAdminConfigured() {
  return Boolean(getConfiguredPassword() && getConfiguredSessionToken());
}

export function hasGalleryAdminSession(context: APIContext) {
  const expected = getConfiguredSessionToken();
  if (!expected) return false;
  const cookie = context.cookies.get(COOKIE_NAME)?.value;
  return Boolean(cookie && cookie === expected);
}

export function validateGalleryAdminCredentials(username: string, password: string) {
  const configuredPassword = getConfiguredPassword();
  return username === 'admin' && Boolean(configuredPassword) && password === configuredPassword;
}

export function setGalleryAdminSession(context: APIContext) {
  const token = getConfiguredSessionToken();
  if (!token) throw new Error('Gallery admin session token is not configured');
  context.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export function clearGalleryAdminSession(context: APIContext) {
  context.cookies.delete(COOKIE_NAME, { path: '/' });
}
