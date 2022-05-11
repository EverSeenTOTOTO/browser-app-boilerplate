import { ref, unref } from 'vue';
import fetch from 'isomorphic-fetch';
import type { PrefetchStore, AppStore } from '..';

export type HomeState = {
  name: string,
};

export class HomeStore implements PrefetchStore<HomeState> {
  root: AppStore;

  name = ref('');

  constructor(root: AppStore) {
    this.root = root;
  }

  async fetchName() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/name`);

    this.name.value = await res.text();
  }

  hydrate(state: HomeState): void {
    this.name.value = state.name;
  }

  dehydra(): HomeState {
    return {
      name: unref(this.name),
    };
  }
}
