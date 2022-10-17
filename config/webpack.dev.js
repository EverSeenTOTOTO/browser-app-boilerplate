const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const { paths } = require('./utils');

const devMock = (req, res, next) => {
  if (/^\/api\//.test(req.url)) {
    console.info(`mock ${req.url}`);

    res.end('webpack dev');
  } else {
    next();
  }
};

const devSSR = (devServer) => async (req, res, next) => {
  const ofs = devServer.compiler.outputFileSystem;
  const template = ofs.readFileSync('dist/index.html', 'utf-8');

  try {
    // Currently, we must build serverEntry before developing client;
    // if you want to HMR serverEntry and develop client at the same time,
    // one option is to hook into webpack-dev-server and build serverEntry into the same output filesystem, most likely:
    //
    // import { patchRequire } from 'fs-monkey';
    // patchRequire(ofs);
    // const { render } = require(paths.serverEntryOutput);

    // eslint-disable-next-line import/no-dynamic-require
    const { render } = await require(paths.serverEntryOutput);
    const { html } = await render({ req, res, template });

    res.end(html);
  } catch (e) {
    console.error(e.stack ?? e.message);
    next();
  }
};

module.exports = merge(common, {
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchFiles: [
      'package.json',
    ],
    devMiddleware: {
      index: false, // provide index.html by devSSR
    },
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.unshift(devMock);
      middlewares.push(devSSR(devServer));

      return middlewares;
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
  optimization: {
    minimize: false,
  },
});
