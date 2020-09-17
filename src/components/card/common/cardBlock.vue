<template>
  <div class="cardBlock radius-12 relative cursor-default" :class="back ? back:'normal-back-100'">
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
    back: String
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/theme/theme";
.cardBlock {
  margin: 0px 12px 12px 12px;
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
