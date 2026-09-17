import { defineMiddleware } from 'astro:middleware';

const protectedPaths = ['/sustainability/workspace'];

export const onRequest = defineMiddleware(({ url, cookies, redirect }, next) => {
  const isProtected = protectedPaths.some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`));

  if (!isProtected) return next();

  const session = cookies.get('aionsi_esg_session')?.value;
  if (!session) {
    const returnTo = encodeURIComponent(`${url.pathname}${url.search}`);
    return redirect(`/sustainability/login?returnTo=${returnTo}`, 302);
  }

  return next();
});
