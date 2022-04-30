/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSSRApp } from 'vue';
import { RouteLocationMatched } from 'vue-router';
import App from './App.vue';
import { createRouter } from './router';
import { createStore, Store, STORE_KEY } from './store';
import './style/index.scss';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createStore();

  app.use(router);
  app.provide(STORE_KEY, store);

  return { app, router, store };
}

export function prefetch(store: Store, matched: RouteLocationMatched[]) {
  const ps: Promise<void>[] = [];

  matched.forEach(({ components }) => {
    Object.values(components).forEach((component) => {
      // @ts-ignore
      if (typeof component.prefetch === 'function') {
        // @ts-ignore
        ps.push(component.prefetch(store));
      }
    });
  });

  return Promise.all(ps);
}
