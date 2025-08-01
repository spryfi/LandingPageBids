import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        agencies: 'src/agencies.html',
        'how-it-works': 'src/how-it-works.html',
        pricing: 'src/pricing.html',
        about: 'src/about.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});