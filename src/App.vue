<script setup>
const hello = `${import.meta.env.VITE_HELLO} vue`;
</script>
<template>
  <div class="scoped">
    {{ hello }}
  </div>
</template>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
