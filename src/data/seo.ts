export const siteSeo = {
  siteName: 'AionSi',
  siteUrl: 'https://aionsi.com',
  defaultTitle: 'AionSi | Semiconductor Engineering from IP to Silicon',
  defaultDescription:
    'AionSi delivers semiconductor engineering across RTL, Design Verification, Physical Design, DFT, protocol verification and SoC/IP engineering.',
  socialImage: '/images/og/aionsi-engineering.jpg',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AionSi',
  url: siteSeo.siteUrl,
  logo: `${siteSeo.siteUrl}/images/logo/aionsi-logo.svg`,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteSeo.siteName,
  url: siteSeo.siteUrl,
};
