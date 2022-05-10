import { ref } from 'vue';

export class AboutStore {
  count = ref(0);

  increment() {
    this.count.value++;
  }
}
