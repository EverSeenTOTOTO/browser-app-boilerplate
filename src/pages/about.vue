<script setup>
import { useStore } from '@/store';

const store = useStore('about');
</script>
<template>
  <router-link to="/">
    Home
  </router-link>
  <div>
    <button @click="store.increment">
      {{ store.count }}
    </button>
  </div>
</template>
