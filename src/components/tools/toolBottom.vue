<template>
  <div class="tool-bottom"></div>
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
.tool-bottom {
  width: 100%;
  height: 64px;
  @include themify($themes) {
    background: themed("tools-back");
  }
}
</style>
