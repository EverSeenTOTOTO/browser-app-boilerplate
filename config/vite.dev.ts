import fs from 'fs';
import { defineConfig, ViteDevServer } from 'vite';
import base, { paths } from './vite.common';

const devMock = () => ({
  name: 'dev-api-mock',
  configureServer(vite: ViteDevServer) {
    const { logger } = vite.config;

    vite.middlewares.use((req, res, next) => {
      if (/^\/api\//.test(req.originalUrl)) {
        logger.info(`mock ${req.originalUrl}`);

        res.end('vite dev');
      } else {
        next();
      }
    });
  },
});

const devSSR = () => ({
  name: 'dev-ssr',
  configureServer(vite: ViteDevServer) {
    const { logger } = vite.config;
    const templateHtml = fs.readFileSync(paths.template, 'utf-8');

    // 缺点是不能调试完整服务端代码，只能调试服务端同构应用的部分
    return () => vite.middlewares.use(async (req, res, next) => {
      try {
        const { render } = await vite.ssrLoadModule(paths.serverEntry);
        const template = await vite.transformIndexHtml(req.originalUrl, templateHtml);
        const { html } = await render({ req, res, template });

        res.end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        logger.error(e.stack ?? e.message);
        next();
      }
    });
  },
});

export default defineConfig((c) => {
  const config = base(c);
  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      devMock(),
      devSSR(),
    ],
  };
});
