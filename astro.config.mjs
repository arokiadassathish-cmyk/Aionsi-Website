import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aionsi.com',
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] }
});
