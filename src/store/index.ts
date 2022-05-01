import {
  ref, inject, Ref, InjectionKey,
} from 'vue';
import fetch from 'isomorphic-fetch';

export type State = {
  name: string,
  count: number
};

export type Store = {
  state: { [key in keyof State]: Ref<State[keyof State]> };

  // define how to merge prefetched data
  hydrate(state: State): void;

  // define user actions
  fetchName(): Promise<void>;
  increment(): void
};

export const STORE_KEY = Symbol('store') as InjectionKey<Store>;

export const useStore = () => inject(STORE_KEY)!;

export const createStore = (): Store => {
  const count = ref(0);
  const name = ref('');

  return {
    state: {
      count,
      name,
    },
    hydrate(state: State) {
      Object.keys(state).forEach((key) => {
        const k = key as keyof State;
        this.state[k].value = state[k];
      });
    },
    async fetchName() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/name`);

      name.value = await res.text();
    },
    increment() {
      count.value++;
    },
  };
};
