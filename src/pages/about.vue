<script setup>
import { useStore } from '@/store';

const store = useStore('about');
const increment = () => store.increment();
</script>
<template>
  <q-chip icon="home">
    <router-link to="/">
      Home
    </router-link>
  </q-chip>
  <div>
    <q-btn
      class="q-ma-sm"
      @click="increment"
    >
      {{ store.count }}
    </q-btn>
  </div>
</template>
