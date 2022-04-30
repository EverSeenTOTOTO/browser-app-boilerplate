import { ref, Ref, InjectionKey } from 'vue';

export type Store = {
  count: Ref<number>;
  hydrate(store: any): void;
  increment(): void;
};

export const STORE_KEY = Symbol('store') as InjectionKey<Store>;

export const createStore = (): Store => {
  const count = ref(0);

  return {
    count,
    hydrate(store: any) {
      count.value = store.count;
    },
    increment() {
      count.value++;
    },
  };
};
