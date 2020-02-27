<template>
  <div class="cardBlock">
    <div class="card-tittle">
      <span class="size-12">{{ tittle }}</span>
      <span class="card-tool"><i class="el-icon-more"></i></span>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    tittle: String
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.cardBlock {
  position: relative;
  // margin: 10px 0px;
}
.card-tittle {
  padding: 17px;
  .card-tool {
    float: right;
  }
  @include themify($themes) {
    color: themed("color");
  }
}
.card-body {
  padding: 17px;
  @include themify($themes) {
    background: themed("back-level1");
  }
}
</style>
