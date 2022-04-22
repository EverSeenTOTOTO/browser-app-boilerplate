/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import postcssNormalize from 'postcss-normalize';
import react from '@vitejs/plugin-react';

const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  entry: path.resolve(__dirname, '..', 'src/index.ts'),
  dist: path.resolve(__dirname, '..', 'dist'),
};

export default ({ mode }) => ({
  build: {
    sourcemap: true,
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
