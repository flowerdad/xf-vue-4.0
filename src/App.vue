<template>
  <div id="app">
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
* {
  margin: 0px;
  padding: 0px;
}
.router {
  position: absolute;
}
.common {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
