<template>
  <div class="cardBlock">
    <div v-if="title != undefined" class="card-title">
      <span class="size-12">{{ title }}</span>
      <span class="card-tool"><i class="el-icon-more"></i></span>
    </div>
    <div class="padding-12">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/theme/theme";
.cardBlock {
  position: relative;
  margin: 12px;
  @include themify($themes) {
    background: themed("normal");
  }
  border-radius: 12px;
  transition: background 0.3s;
}
.cardBlock:hover {
  @include themify($themes) {
    background: themed("light");
  }
}
.card-title {
  padding: 17px;
  .card-tool {
    float: right;
  }
  @include themify($themes) {
    color: themed("whites");
  }
}
</style>
