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
    <q-banner class="scoped">
      {{ hello }}
    </q-banner>
    <router-link to="/about">
      <q-chip>
        About
      </q-chip>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
