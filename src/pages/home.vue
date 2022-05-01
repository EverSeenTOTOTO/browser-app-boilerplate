<script lang="ts">
import { useStore } from '@/store';
import { PrefetchContext } from '@/main';

export default {
  name: 'HomePage',
  prefetch(ctx: PrefetchContext) {
    return ctx.store.home.fetchName();
  },
  setup() {
    const store = useStore('home');
    const hello = `hello ${store.name.value}`;

    return {
      hello,
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
  </div>
</template>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
