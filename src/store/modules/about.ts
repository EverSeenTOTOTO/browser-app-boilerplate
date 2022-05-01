import { ref } from 'vue';
import type { Store } from '..';

export type AboutState = {
  count: number
};

export class AboutStore implements Store<AboutState> {
  count = ref(0);

  increment() {
    this.count.value++;
  }
}
