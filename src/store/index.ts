/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, InjectionKey, Ref } from 'vue';
import { HomeStore } from './modules/home';
import { AboutStore } from './modules/about';

export type Store<State> = {
  [key in keyof State]: Ref<State[key]>
};

export type PrefetchStore<State> = Store<State> & {
  // merge ssr prefetched data
  hydrate(state: State): void;
  // provide ssr prefetched data
  dehydra(): State;
};

// if use glob import, seem hard to determine types
export const createStore = () => Object.freeze({
  home: new HomeStore(),
  about: new AboutStore(),

  hydrate(data: Record<string, unknown>) {
    Object.keys(data).forEach((key) => {
      const k = key as keyof typeof this;

      // @ts-ignore
      if (this[k] && this[k].hydrate) {
        // @ts-ignore
        this[k].hydrate(data[key]);
      }
    });
  },

  dehydra() {
    const data: Record<string, unknown> = {};

    Object.keys(this).forEach((key) => {
      const k = key as keyof typeof this;

      // @ts-ignore
      if (this[k] && this[k].dehydra) {
        // @ts-ignore
        data[k] = this[k].dehydra();
      }
    });

    return data;
  },
});

export type AppStore = ReturnType<typeof createStore>;

export const STORE_KEY = Symbol('store') as InjectionKey<AppStore>;

export const useStore = <T extends keyof AppStore>(name: T): AppStore[T] => inject(STORE_KEY)![name];
