<template>
  <div id="app" class="app" :class="'theme-' + themeType">
    <!-- 地图 -->
    <mainMap type="main" v-if="$route.meta.keepAlive" />
    <!-- main -->
    <router-view class="router" />
    <!-- 工具库 -->
    <toolsCommon class="toolsCommon" v-if="$route.meta.keepAlive" />
  </div>
</template>
<script>
import toolsCommon from "@/components/common/toolsCommon.vue";
import mainMap from "@/components/map/map";
import { mapGetters } from "vuex";
export default {
  components: {
    toolsCommon,
    mainMap
  },
  data() {
    return {
      themeType: localStorage.theme ? localStorage.theme : "defalut"
    };
  },
  computed: {
    ...mapGetters(["theme"]),
    theme() {
      return this.$store.state.permissions.theme;
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
.toolsCommon {
  position: absolute;
  /* width: 100%;
  height: 100%; */
  /* pointer-events: none; */
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
