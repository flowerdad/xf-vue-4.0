<template>
  <div id="app" class="app" :class="'theme-' + themeType">
    <common class="common" v-if="$route.meta.keepAlive" />
    <router-view class="router" />
  </div>
</template>
<script>
import common from "@/components/common/common.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    common
  },
  data() {
    return {
      themeType: localStorage.theme ? localStorage.theme : "defalut"
    };
  },
  methods() {
    console.log();
  },
  computed: {
    ...mapGetters(["theme"]),
    theme() {
      return this.$store.state.theme;
    }
  },
  watch: {
    theme() {
      this.themeType = this.theme;
    }
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
