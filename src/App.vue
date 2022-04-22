<script>
export default {
  setup() {
    return {
      hello: `${import.meta.env.VITE_HELLO} frontend`,
    };
  },
};
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
