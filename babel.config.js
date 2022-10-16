module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
    }],
  ],
  exclude: [
    /node_modules[\\/]@babel/,
    /node_modules[\\/]vue-loader/,
    /node_modules[\\/]css-loader/,
    /node_modules[\\/]core-js/,
    /node_modules[\\/]webpack[\\/]buildin/,
  ],
};
