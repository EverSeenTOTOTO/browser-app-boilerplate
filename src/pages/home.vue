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

    return {
      data: store.name
    };
  },
};

</script>
<template>
  <div>
    <q-banner class="scoped">
      hello {{ data }}
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
