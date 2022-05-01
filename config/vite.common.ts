import path from 'path';
import postcssNormalize from 'postcss-normalize';
import vue from '@vitejs/plugin-vue';

export const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist'),
  template: path.resolve(__dirname, '..', 'index.html'),
  server: path.resolve(__dirname, '..', 'src/server/index.ts'), // 服务端代码入口
  serverEntry: path.resolve(__dirname, '..', 'src/index.server.ts'), // 服务端同构应用入口
  serverOutput: path.resolve(__dirname, '..', 'dist/server.js'),
};

export default ({ mode }) => ({
  build: {
    sourcemap: mode === 'development',
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
    vue({
      reactivityTransform: true,
    }),
  ],
});
