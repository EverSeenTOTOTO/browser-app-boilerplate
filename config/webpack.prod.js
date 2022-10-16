const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        use: [
          {
            loader: 'babel-loader',
          },
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
});
