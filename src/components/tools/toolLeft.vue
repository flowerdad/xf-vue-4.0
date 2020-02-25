<template>
  <div class="tool-left"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.tool-left {
  width: 64px;
  height: 100vh;
  @include themify($themes) {
    background: themed("tools-back");
  }
}
</style>
