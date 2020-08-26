<template>
  <div class="home">
    <!-- <toolPack class="toolPackLeft" modules="" :class="toolPackLeft ? 'toolPackLeftZoom' : ''" /> -->
    <contentPack class="toolPackRight" :modules="toolRightModuleList" :class="toolPackRight ? 'toolPackRightZoom' : ''" />
    <left class="toolLeft" />
    <right class="toolRight" />
    <navbar class="toolNavBar" />
    <toolMap class="toolMap" :class="mapPack ? 'toolMapZoom' : ''" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from 'vuex'
import left from "./left/left";
import right from "./right/right";
import navbar from "./navbar/navbar";
import toolMap from "./map/toolMap";
import contentPack from "./common/contentPack";
export default {
  name: "home",
  components: {
    left,
    right,
    navbar,
    toolMap,
    contentPack
  },
  data() {
    return {
      toolRightModuleList: []
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["mapPack", "toolPackLeft", "toolPackRight", "toolLeftModule", "toolRightModule"]),
    mapPack() {
      return this.$store.state.notice.mapPack;
    },
    toolPackLeft() {
      return this.$store.state.notice.toolPackLeft;
    },
    toolPackRight() {
      console.log(this.$store.state.notice.toolPackRight)
      return this.$store.state.notice.toolPackRight;
    },
    toolLeftModule() {
      return this.$store.state.notice.toolLeftModule;
    },
    toolRightModule() {
      return this.$store.state.notice.toolRightModule;
    }
  },
  watch: {
    // toolLeftModule() { },
    toolRightModule() {
      this.toolRightModuleList = [];
      this.toolRightModule.forEach(element => {
        this.toolRightModuleList.push(element.type)
      });
      console.log(this.toolRightModuleList)
    }
  }
};
</script>

<style lang="scss" scoped>
.toolLeft {
  position: fixed;
  left: 0px;
  top: 0px;
}
.toolRight {
  position: fixed;
  right: 0px;
  top: 0px;
}
.toolNavBar {
  position: fixed;
  left: 0px;
  bottom: 0px;
}
.toolMap {
  position: fixed;
  right: 416px;
  bottom: 80px;
  transition: all 0.5s;
}
.toolMapZoom {
  right: 96px;
}
.toolPackLeft {
  position: fixed;
  left: -320px;
  transition: all 0.5s;
}
.toolPackRight {
  position: fixed;
  right: -320px;
  transition: all 0.5s;
}
.toolPackLeftZoom {
  left: 64px;
}
.toolPackRightZoom {
  right: 64px;
}
</style>
