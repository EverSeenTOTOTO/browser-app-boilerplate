/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import postcssNormalize from 'postcss-normalize';
import react from '@vitejs/plugin-react';

export const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist'),
  template: path.resolve(__dirname, '..', 'index.html'),
  server: path.resolve(__dirname, '..', 'src/server/index.ts'), // 服务端代码入口
  serverEntry: path.resolve(__dirname, '..', 'src/index.server.tsx'), // 服务端同构应用入口
  serverOutput: path.resolve(__dirname, '..', 'dist/server.js'),
};

export default ({ mode }) => ({
  build: {
    sourcemap: true,
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': paths.src,
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        postcssNormalize(),
      ],
    },
    devSourcemap: mode === 'development',
  },
  plugins: [
    react(),
  ],
});
