/* eslint-disable @typescript-eslint/no-use-before-define */
import { renderToString } from 'vue/server-renderer';
import { createApp, prefetch } from './createApp';

export async function render(req: { originalUrl: string }) {
  const { app, router, store } = createApp();

  router.push(req.originalUrl);

  await router.isReady();
  await prefetch(store, router.currentRoute.value.matched);

  const ctx: { [key: string]: unknown } = {};
  const html = await renderToString(app, ctx);

  return [html, ctx];
}
