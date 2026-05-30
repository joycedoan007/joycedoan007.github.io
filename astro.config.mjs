import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://joycedoan007.github.io',
  base: '/portfolio',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    react(),
  ],
});
