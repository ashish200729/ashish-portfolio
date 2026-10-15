import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seo from './scripts/seo-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
  // Hashed bundles live apart from the logos in public/assets, so they can be cached forever.
  build: { assetsDir: '_app' },
});
