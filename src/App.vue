<template>
  <div id="app" class="app theme-green">
    <common class="common" v-if="$route.meta.keepAlive" />
    <router-view class="router" />
  </div>
</template>
<script>
import common from "@/components/common/common.vue";
export default {
  name: "home",
  components: {
    common
  },
  data() {
    return {};
  }
};
</script>
<style>
.router {
  position: absolute;
}
.common {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
@import "./assets/styles/theme";
* {
  @include themify($themes) {
    color: themed("font-color");
  }
}
</style>
