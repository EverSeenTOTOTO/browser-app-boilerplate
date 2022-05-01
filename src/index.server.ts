import { renderToString } from 'vue/server-renderer';
import serializeJavascript from 'serialize-javascript';
import { unref } from 'vue';
import { createApp, prefetch, RenderContext } from './main';

// see index.html
const APP_HTML = '<!--app-html-->';
const APP_STATE = '<!--app-state-->';

const serialize = (state: any) => `<script>;window.__PREFETCHED_STATE__=${serializeJavascript(state)};</script>`;

export async function render(context: RenderContext): Promise<Required<RenderContext>> {
  const { app, router, store } = createApp();
  const ctx = context as Required<RenderContext>;

  router.push(ctx.req.originalUrl);

  ctx.app = app;
  ctx.store = store;
  ctx.router = router;

  await router.isReady();
  await prefetch(ctx, router.currentRoute.value.matched).catch(console.error); // better nothrow

  const html = await renderToString(app, ctx);
  const state: any = {};

  Object.keys(ctx.store.state).forEach((k) => {
    // unref state
    state[k] = unref(ctx.store.state[k as keyof typeof ctx.store.state]);
  });

  ctx.html = ctx.template
    .replace(APP_HTML, html)
    .replace(APP_STATE, serialize(state));

  return ctx;
}
