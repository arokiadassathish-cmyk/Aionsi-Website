import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  site: 'https://aionsi.com',
  output: 'server',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] }
});
