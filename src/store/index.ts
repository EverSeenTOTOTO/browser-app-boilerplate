/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

export class AppStore {
  home: HomeStore;

  about: AboutStore;

  constructor() {
    this.home = new HomeStore(this);
    this.about = new AboutStore(this);
  }

  hydrate(data: Record<string, unknown>) {
    Object.keys(data).forEach((key) => {
      const k = key as PickKeys<AppStore>;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this[k]?.hydrate?.(data[k] as any);
    });
  }

  dehydra() {
    type Data = Record<PickKeys<AppStore>, unknown>;
    const data: Partial<Data> = {};

    Object.keys(this).forEach((key) => {
      const k = key as PickKeys<AppStore>;

      data[k] = this[k]?.dehydra?.();
    });

    return data as Data;
  }
}

const appStore = new AppStore();
export const createStore = () => appStore;
export const useStore = <T extends keyof AppStore>(name: T): AppStore[T] => appStore[name];
