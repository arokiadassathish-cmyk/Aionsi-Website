export const siteUrl = 'https://aionsi.com';

export const defaultSiteSeo = {
  title: 'AionSi | Semiconductor Engineering from IP to Silicon',
  description:
    'AionSi provides semiconductor engineering across RTL design, design verification, physical design, DFT, protocol verification and SoC/IP engineering.',
  ogImage: `${siteUrl}/images/og/aionsi-engineering.jpg`,
};

export function absoluteUrl(pathname: string) {
  return new URL(pathname || '/', siteUrl).toString();
}
