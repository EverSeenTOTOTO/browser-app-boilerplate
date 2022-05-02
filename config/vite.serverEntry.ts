import { quasar } from '@quasar/vite-plugin';
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
    plugins: [
      ...(config.plugins || []),
      quasar({
        sassVariables: paths.quasarVariables,
        runMode: 'ssr-server',
      }),
    ],
  };
});
