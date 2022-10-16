const nodeExternals = require('webpack-node-externals');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { VueLoaderPlugin } = require('vue-loader');

const { paths, isDevelopment } = require('./utils');

// serverEntry
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    'index.server': paths.serverEntry,
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    clean: false,
    path: paths.dist,
    library: {
      type: 'commonjs-static',
    },
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: [
      '.vue',
      '.mjs',
      '.js',
      '.ts',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true,
        },
      },
      {
        test: /\.(j|t)s$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'es2015',
              tsconfigRaw: require('../tsconfig.json'),
            },
          },
        ],
      },
      {
        // advanced step is to collect and inject server rendered css
        test: /\.(css|(?:s(a|c)ss)|png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: require.resolve('null-loader'),
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
