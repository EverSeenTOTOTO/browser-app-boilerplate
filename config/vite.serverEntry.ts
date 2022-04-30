import { defineConfig } from 'vite';
import base, { paths } from './vite.common';

export default defineConfig((c) => {
  const config = base(c);

  return {
    ...config,
    build: {
      ...config.build,
      ssr: paths.serverEntry,
    },
  };
});
