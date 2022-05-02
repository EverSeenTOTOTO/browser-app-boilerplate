import serializeJavascript from 'serialize-javascript';
import { renderToString } from 'vue/server-renderer';
import { createApp, prefetch, RenderContext } from './main';

// see index.html
const APP_HTML = '<!--app-html-->';
const APP_STATE = '<!--app-state-->';

const serialize = (state: Record<string, unknown>) => `<script>;window.__PREFETCHED_STATE__=${serializeJavascript(state)};</script>`;

export async function render(context: RenderContext): Promise<Required<RenderContext>> {
  const { app, router, store } = createApp(context);
  const ctx = context as Required<RenderContext>;

  router.push(ctx.req.originalUrl);

  ctx.app = app;
  ctx.store = store;
  ctx.router = router;

  await router.isReady();
  await prefetch(ctx, router.currentRoute.value.matched).catch(console.error); // better nothrow

  const html = await renderToString(app, ctx);
  // get ssr prefetched data
  const state = store.dehydra();

  ctx.html = ctx.template
    .replace(APP_HTML, html)
    .replace(APP_STATE, serialize(state));

  return ctx;
}
