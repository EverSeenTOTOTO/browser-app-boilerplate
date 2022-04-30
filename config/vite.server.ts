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
        dir: undefined, // must leave undefined explicitly
        file: paths.serverOutput,
      },
    },
  },
  ssr: {
    external: ['express'],
  },
}));
