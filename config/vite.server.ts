import { defineConfig } from 'vite';
import { paths } from './vite.common';

export default defineConfig(() => ({
  build: {
    ssr: true,
    sourcemap: true,
    emptyOutDir: false,
    rollupOptions: {
      input: paths.server,
      output: {
        dir: undefined,
        file: paths.serverBundle,
      },
    },
  },
  ssr: {
    external: ['express'],
  },
}));
