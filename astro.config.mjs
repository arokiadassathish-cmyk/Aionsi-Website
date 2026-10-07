import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  site: 'https://aionsi.com',
  output: 'server',
  redirects: {
    '/contact-us': '/contact',
    '/case-study/layout-and-design-case-study-1-': '/evidence/advanced-node-physical-design-timing-congestion-signoff',
    '/service/design-verification': '/capabilities/design-verification',
    '/service/ams-verification': '/capabilities',
  },
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] }
});
