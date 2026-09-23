// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://alquiler-tocumen-la-siesta.vercel.app',
  output: 'static',
  adapter: vercel()
});
