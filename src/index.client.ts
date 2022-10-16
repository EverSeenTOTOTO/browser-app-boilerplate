import { createApp, prefetch } from './main';
import './style/index.scss';

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
    if (process.env.NODE_ENV === 'development') {
      console.log('prefetched state', window.__PREFETCHED_STATE__);
    }

    // merge ssr prefetched data
    store.hydrate(window.__PREFETCHED_STATE__);
    delete window.__PREFETCHED_STATE__;
  } else {
    // fallback to client prefetch
    prefetch({ app, router, store }, matched).catch(console.error);
  }

  next();
});

router.isReady().then(() => {
  app.mount('#root');
});
