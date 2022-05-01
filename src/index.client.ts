import { createApp, prefetch } from './main';
import './style/index.scss';

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

    if (window.__PREFETCHED_STATE__) {
      if (import.meta.env.DEV) {
        console.log('prefetched state', window.__PREFETCHED_STATE__);
      }
      // merge ssr prefetched data
      store.hydrate(window.__PREFETCHED_STATE__);
      delete window.__PREFETCHED_STATE__;
    }

    try {
      // sync or fallback to client prefetch
      await prefetch({ app, router, store }, matched);
    } finally {
      next();
    }
  });

  router.isReady().then(() => {
    app.mount('#root');
  });
} else {
  console.error('Root element #root not found');
}
