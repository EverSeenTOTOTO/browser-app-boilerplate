import serializeJavascript from 'serialize-javascript';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App, RenderContext, prefetch } from './App';
import { createStore } from './store';
import { createRoutes } from './routes';

// see index.html
const APP_HTML = '<!--app-html-->';
const APP_STATE = '<!--app-state-->';

const serialize = (state: Record<string, unknown> | undefined) => `<script>;window.__PREFETCHED_STATE__=${serializeJavascript(state)};</script>`;

export async function render(context: RenderContext) {
  const ctx = context as Required<RenderContext>;
  const { req } = ctx;

  const store = createStore();
  const routes = createRoutes();

  ctx.store = store;
  ctx.routes = routes;

  const success = await prefetch(ctx).catch((e) => {
    console.error(e);

    return false;
  });

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App store={store} routes={routes}/>
    </StaticRouter>,
  );

  // state avaliable now
  const state = success ? store.dehydra() : undefined;

  ctx.html = ctx.template
    .replace(APP_HTML, html)
    .replace(APP_STATE, serialize(state));

  return ctx;
}
