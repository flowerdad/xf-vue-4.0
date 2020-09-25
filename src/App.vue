<template>
  <div id="app" class="app" :class="'theme-' + themeType">
    <!-- 地图 -->
    <mainMap type="main" v-if="$route.meta.keepAlive" />
    <!-- main -->
    <router-view class="router" />
    <!-- 工具库 -->
    <tools class="tools" v-if="$route.meta.keepAlive" />
    <!-- <voiceControl class="voiceControl" /> -->
  </div>
</template>
<script>
import tools from "@/components/tools/tools.vue";
import mainMap from "@/components/map/map";
// import voiceControl from "@/components/speech/voiceControl";
import { mapGetters } from "vuex";
export default {
  components: {
    tools,
    mainMap,
    // voiceControl
  },
  data() {
    return {
      themeType: localStorage.theme != 'null' ? localStorage.theme : "defalut"
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
      console.log('主题切换成功！')
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
}
.voiceControl {
  position: absolute;
  width: 320px;
  height: 100px;
  background: red;
  right: 450px;
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
