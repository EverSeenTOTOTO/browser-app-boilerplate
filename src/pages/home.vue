<script lang="ts">
import { inject } from 'vue';
import { Store, STORE_KEY } from '@/store';

export default {
  name: 'HomePage',
  async prefetch(store: Store) {
    for (let i = 0; i < 1000; i++) {
      store.increment();
    }
  },
  setup() {
    const hello = `${import.meta.env.VITE_HELLO} vue`;
    const store = inject(STORE_KEY);

    return {
      hello,
      store,
    };
  },
};

</script>
<template>
  <div class="scoped">
    {{ hello }}
  </div>
  <button @click="store.increment">
    {{ store.count }}
  </button>
</template>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
