import type { Request } from 'express';
import { App as Application, createSSRApp } from 'vue';
import { RouteLocationMatched, Router, RouteRecordNormalized } from 'vue-router';
import App from './App.vue';
import { createRouter } from './router';
import type { Store } from './store';
import { createStore, STORE_KEY } from './store';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createStore();

  app.use(router);
  app.provide(STORE_KEY, store);

  return { app, router, store };
}

export type RenderContext = {
  req: Request;
  template: string;
  store?: Store;
  app?: Application;
  router?: Router;
  html?: string;
};

// prefetch fallback in client side has no req/template/html
export type PrefetchContext = Omit<Required<RenderContext>, 'req' | 'template' | 'html'>;

export function prefetch(ctx: PrefetchContext, matched: (RouteLocationMatched | RouteRecordNormalized)[]) {
  const ps: Promise<void>[] = [];

  matched.forEach(({ components }) => {
    Object.values(components).forEach((component) => {
      // TODO: shall we prefetch for lazy components?
      if (typeof component !== 'function' && typeof component.prefetch === 'function') {
        ps.push(component.prefetch(ctx));
      }
    });
  });

  return Promise.all(ps);
}
