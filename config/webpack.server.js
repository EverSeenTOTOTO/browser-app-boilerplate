const nodeExternals = require('webpack-node-externals');
const { paths, isDevelopment } = require('./utils');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    server: paths.server,
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  target: 'node',
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
  },
  module: {
    rules: [
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
    ],
  },
};
