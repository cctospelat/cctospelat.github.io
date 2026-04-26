// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://cctospelat.github.io',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});