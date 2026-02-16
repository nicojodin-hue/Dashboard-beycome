import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/Dashboard-beycome/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
});
