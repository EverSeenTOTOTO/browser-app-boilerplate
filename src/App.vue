<template>
  <div class="scoped">
    {{ hello }}
  </div>
</template>
<script>
export default {
  setup() {
    return {
      hello: `${process.env.HELLO} frontend`,
    };
  },
};
</script>
<style lang="scss" scoped>
.scoped {
  color: blue;
}
</style>
