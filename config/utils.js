const path = require('path');

module.exports.isDevelopment = process.env.NODE_ENV === 'development';

module.exports.paths = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist'),
  template: path.resolve(__dirname, '..', 'index.html'),
  clientEntry: path.resolve(__dirname, '..', 'src/index.client.ts'), // 客户端同构应用入口
  server: path.resolve(__dirname, '..', 'src/server/index.ts'), // 服务端入口
  serverOutput: path.resolve(__dirname, '..', 'dist/server.js'), // 服务端输出
  serverEntry: path.resolve(__dirname, '..', 'src/index.server.ts'), // 服务端同构应用入口
  serverEntryOutput: path.resolve(__dirname, '..', 'dist/index.server.js'), // 服务端同构应用输出
};
