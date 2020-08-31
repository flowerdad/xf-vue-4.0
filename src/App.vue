<template>
  <div id="app" class="app" :class="'theme-' + themeType">
    <!-- 地图 -->
    <mainMap type="main" v-if="$route.meta.keepAlive" />
    <!-- main -->
    <router-view class="router" />
    <!-- 工具库 -->
    <tools class="tools" v-if="$route.meta.keepAlive" />
  </div>
</template>
<script>
import tools from "@/components/tools/tools.vue";
import mainMap from "@/components/map/map";
import { mapGetters } from "vuex";
export default {
  components: {
    tools,
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
.tools {
  position: absolute;
  /* width: 100%;
  height: 100%; */
  /* pointer-events: none; */
}
</style>

<style lang="scss" scoped>
@import "./assets/styles/theme/theme";
* {
  @include themify($themes) {
    color: themed("whites-color-50");
  }
}
</style>
