<template>
  <div id="app">
    <common v-if="$route.meta.keepAlive" />
    <router-view />
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
<style lang="scss"></style>
