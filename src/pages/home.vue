<script lang="ts">
import { useStore } from '@/store';

export default {
  name: 'HomePage',
  prefetch() {
    const store = useStore('home');

    return store.fetchName();
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
