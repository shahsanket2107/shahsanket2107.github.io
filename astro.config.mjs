// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shahsanket2107.github.io',
  integrations: [tailwind(), sitemap()],
  build: {
    assets: '_assets',
  },
});
