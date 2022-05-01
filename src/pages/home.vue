<script lang="ts">
import { useStore } from '@/store';
import { PrefetchContext } from '@/main';

export default {
  name: 'HomePage',
  prefetch(ctx: PrefetchContext) {
    return ctx.store.fetchName();
  },
  setup() {
    const store = useStore();
    const hello = `hello ${store.state.name.value}`;

    return {
      hello,
      store,
    };
  },
};

</script>
<template>
  <div>
    <router-link to="/about">
      About
    </router-link>
    <div class="scoped">
      {{ hello }}
    </div>
    <button @click="store.increment">
      {{ store.state.count }}
    </button>
  </div>
</template>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
