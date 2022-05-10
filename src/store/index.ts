/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, InjectionKey } from 'vue';
import { HomeStore } from './modules/home';
import { AboutStore } from './modules/about';

export type PrefetchStore<State> = {
  // merge ssr prefetched data
  hydrate(state: State): void;
  // provide ssr prefetched data
  dehydra(): State;
};

type PickKeys<T> = {
  [K in keyof T]: T[K] extends PrefetchStore<unknown> ? K : never
}[keyof T];

// if use glob import, seem hard to determine types
export const createStore = () => Object.freeze({
  home: new HomeStore(),
  about: new AboutStore(),

  hydrate(data: Record<string, unknown>) {
    Object.keys(data).forEach((key) => {
      const k = key as PickKeys<typeof this>;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this[k]?.hydrate?.(data[k] as any);
    });
  },

  dehydra() {
    type Data = Record<PickKeys<typeof this>, unknown>;
    const data: Partial<Data> = {};

    Object.keys(this).forEach((key) => {
      const k = key as PickKeys<typeof this>;

      data[k] = this[k]?.dehydra?.();
    });

    return data as Data;
  },
});

export type AppStore = ReturnType<typeof createStore>;

export const STORE_KEY = Symbol('store') as InjectionKey<AppStore>;

export const useStore = <T extends keyof AppStore>(name: T): AppStore[T] => inject(STORE_KEY)![name];
