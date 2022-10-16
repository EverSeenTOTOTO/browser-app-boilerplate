import serializeJavascript from 'serialize-javascript';
import { renderToString } from 'vue/server-renderer';
import { createApp, prefetch, RenderContext } from './main';

// see index.html
const APP_HTML = '<!--app-html-->';
const APP_STATE = '<!--app-state-->';

const serialize = (state: Record<string, unknown> | undefined) => `<script>;window.__PREFETCHED_STATE__=${serializeJavascript(state)};</script>`;

export async function render(context: RenderContext): Promise<Required<RenderContext>> {
  const { app, router, store } = createApp();
  const ctx = context as Required<RenderContext>;

  router.push(ctx.req.originalUrl);

  await router.isReady();

  ctx.app = app;
  ctx.store = store;
  ctx.router = router;

  const state = await prefetch(ctx, router.currentRoute.value.matched)
    .then(() => store.dehydra())
    .catch((e) => {
      console.error(e);

      return undefined;
    }); // better nothrow

  const html = await renderToString(app, ctx);

  ctx.html = ctx.template
    .replace(APP_HTML, html)
    .replace(APP_STATE, serialize(state));

  return ctx;
}
