const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  entry: path.resolve(__dirname, '..', 'src/index.ts'),
  dist: path.resolve(__dirname, '..', 'dist'),
};

module.exports = {
  entry: paths.entry,
  output: {
    clean: true,
    filename: 'index.js',
    path: paths.dist,
    library: {
      type: 'umd',
    },
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: [
      '.mjs',
      '.js',
      '.ts',
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    port: 3000,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: paths.dist,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
};
