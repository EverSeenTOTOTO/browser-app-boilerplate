<script setup>
const hello = `${process.env.HELLO} vue`;
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
