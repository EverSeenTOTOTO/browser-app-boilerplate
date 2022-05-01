import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import base from './vite.common';

export default defineConfig((c) => {
  const config = base(c);
  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      legacy(), // legacy browser support
    ],
  };
});
