/* eslint-disable @typescript-eslint/no-use-before-define */
import { renderToString } from 'vue/server-renderer';
import { createApp } from './createApp';

export async function render(url: string) {
  const { app, router } = createApp();

  router.push(url);
  await router.isReady();

  const ctx: { [key: string]: unknown } = {};
  const html = await renderToString(app, ctx);

  return [html, ctx];
}
