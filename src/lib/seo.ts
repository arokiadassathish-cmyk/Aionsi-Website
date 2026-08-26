export const siteUrl = 'https://aionsi.com';

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}
