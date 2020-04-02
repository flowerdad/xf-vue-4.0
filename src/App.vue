<template>
  <div id="app" class="app" :class="'theme-' + themeType">
    <toolsCommon class="toolsCommon" v-if="$route.meta.keepAlive" />
    <router-view class="router" />
  </div>
</template>
<script>
import toolsCommon from "@/components/common/toolsCommon.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    toolsCommon
  },
  data() {
    return {
      themeType: localStorage.theme ? localStorage.theme : "defalut"
    };
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
.toolsCommon {
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
