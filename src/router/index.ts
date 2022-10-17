import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router';

const pages = {
  home: () => import('../pages/home.vue'),
  about: () => import('../pages/about.vue'),
};

const routes = Object.keys(pages).map((name) => ({
  path: name === 'home' ? '/' : `/${name}`,
  component: pages[name as keyof typeof pages],
}));

export function createRouter() {
  return _createRouter({
    history: globalThis.document
      ? createWebHistory()
      : createMemoryHistory(),
    routes,
  });
}
