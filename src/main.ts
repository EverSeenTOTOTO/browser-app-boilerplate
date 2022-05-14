import type { Request, Response } from 'express';
import { App as Application, createSSRApp } from 'vue';
import { RouteLocationMatched, Router, RouteRecordNormalized } from 'vue-router';
import { Quasar } from 'quasar';
import App from './App.vue';
import { createRouter } from './router';
import type { AppStore } from './store';
import { createStore } from './store';

export type RenderContext = {
  req: Request;
  res: Response;
  template: string;
  store?: AppStore;
  app?: Application;
  router?: Router;
  html?: string;
};

export function createApp(ctx?: RenderContext) {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createStore();

  app.use(router);
  app.use(Quasar, {}, ctx);

  return { app, router, store };
}

// prefetch fallback in client side has no req/res/template/html
export type PrefetchContext = Omit<Required<RenderContext>, 'req' | 'res' | 'template' | 'html'>;

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
