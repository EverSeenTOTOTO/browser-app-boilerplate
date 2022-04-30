import { createApp, prefetch } from './createApp';

const root = document.getElementById('root');

if (root) {
  const { app, router, store } = createApp();

  router.beforeResolve(async (to, from, next) => {
    const { matched } = to;
    const prevMatched = from.matched;

    let diffed = false;
    const activated = matched.filter((c, i) => {
      if (!diffed) {
        diffed = (prevMatched[i] !== c);
      }
      return diffed;
    });

    if (activated.length === 0) {
      next();
      return;
    }

    if (!window.__PREFETCHED_STATE__) {
      await prefetch(store, matched).finally(next);
      return;
    }

    store.hydrate(window.__PREFETCHED_STATE__);
    delete window.__PREFETCHED_STATE__;

    next();
  });

  router.isReady().then(() => {
    app.mount('#root');
  });
} else {
  console.error('Root element #root not found');
}
