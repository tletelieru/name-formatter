import { defineConfig } from 'vite';

export default defineConfig({
  root: 'demo',
  base: '/name-formatter/',
  build: { outDir: 'dist', emptyOutDir: true },
});
