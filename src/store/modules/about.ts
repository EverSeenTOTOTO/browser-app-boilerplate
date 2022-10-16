import { ref } from 'vue';
import type { AppStore } from '..';

export class AboutStore {
  root: AppStore;

  count = ref(0);

  constructor(root: AppStore) {
    this.root = root;
  }

  increment() {
    this.count.value++;
  }
}
