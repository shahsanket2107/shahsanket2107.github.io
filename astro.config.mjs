// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://shahsanket2107.github.io',
  integrations: [tailwind()],
  build: {
    assets: '_assets',
  },
});
