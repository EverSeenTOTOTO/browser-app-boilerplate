const path = require('path');

module.exports.isDevelopment = process.env.NODE_ENV === 'development';
module.exports.paths = {
  src: path.resolve(__dirname, '..', 'src'),
  entry: path.resolve(__dirname, '..', 'src/index.tsx'),
  dist: path.resolve(__dirname, '..', 'dist'),
};
