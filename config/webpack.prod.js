const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        use: 'babel-loader',
      },
    ],
  },
});
