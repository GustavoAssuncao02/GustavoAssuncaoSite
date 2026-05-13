import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/GustavoAssuncaoSite/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        curriculo: 'curriculo-gustavo.html',
      },
    },
  },
});
