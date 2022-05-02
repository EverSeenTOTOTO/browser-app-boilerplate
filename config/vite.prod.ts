import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { quasar } from '@quasar/vite-plugin';
import base, { paths } from './vite.common';

export default defineConfig((c) => {
  const config = base(c);
  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      legacy(), // legacy browser support
      quasar({
        sassVariables: paths.quasarVariables,
        runMode: 'ssr-client',
      }),
    ],
  };
});
