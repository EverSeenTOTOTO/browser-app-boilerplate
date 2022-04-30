import path from 'path';
import postcssNormalize from 'postcss-normalize';
import vue from '@vitejs/plugin-vue';

export const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  entry: path.resolve(__dirname, '..', 'src/index.ts'),
  server: path.resolve(__dirname, '..', 'src/server/index.ts'),
  dist: path.resolve(__dirname, '..', 'dist'),
  serverBundle: path.resolve(__dirname, '..', 'dist/server.js'),
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
    vue({
      reactivityTransform: true,
    }),
  ],
});
