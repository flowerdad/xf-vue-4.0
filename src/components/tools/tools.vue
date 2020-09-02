<template>
  <div class="home">
    <transition name="fade">
      <div v-show="maskDisplay" class="mask z-index-1"></div>
    </transition>
    <pack class="toolPackRight" :modules="toolRightModuleList" :class="[toolPackRight ? 'toolPackRightZoom' : '' , draggPack ? 'z-index-2' : 'z-index-0']" />
    <edit class="toolEdit" :class="[toolEdit ? 'toolEditZoom' : '' , draggEdit ? 'z-index-2':'z-index-0']" />
    <left class="toolLeft" :class="draggLeft ? 'z-index-2' : 'z-index-0'" />
    <right class="toolRight" :class="draggRight ? 'z-index-2' : 'z-index-0'" />
    <navbar class="toolNavBar " :class="draggNavBar ? 'z-index-2' : 'z-index-0'" />
    <toolMap class="toolMap " :class="[mapPack ? 'toolMapZoom' : '' , draggMap ? 'z-index-2' : 'z-index-0']" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from 'vuex'
import left from "./left/left";
import right from "./right/right";
import navbar from "./navbar/navbar";
import toolMap from "./map/toolMap";
import pack from "./common/pack";
import edit from "./common/edit";
export default {
  name: "home",
  components: {
    left,
    right,
    navbar,
    toolMap,
    pack,
    edit
  },
  data() {
    return {
      toolRightModuleList: [],
      draggPack: false,
      draggEdit: false,
      draggLeft: false,
      draggRight: false,
      draggNavBar: false,
      draggMap: false,
      maskDisplay: false
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["mapPack", "toolPackLeft", "toolPackRight", "toolLeftModule", "toolRightModule", "toolEdit", "mask"]),
    mapPack() {
      return this.$store.state.notice.mapPack;
    },
    toolPackLeft() {
      return this.$store.state.notice.toolPackLeft;
    },
    toolPackRight() {
      return this.$store.state.notice.toolPackRight;
    },
    toolLeftModule() {
      return this.$store.state.notice.toolLeftModule;
    },
    toolRightModule() {
      return this.$store.state.notice.toolRightModule;
    },
    toolEdit() {
      return this.$store.state.notice.toolEdit;
    },
    mask() {
      return this.$store.state.notice.mask;
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
    },
    mask() {
      let mask = this.mask;
      if (mask == 'draggEdit') {
        this.maskDisplay = true;
        this.draggEdit = true
      } else {
        this.maskDisplay = false
        this.draggEdit = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
.toolPackRight,
.toolEdit {
  position: fixed;
  right: -320px;
  transition: all 0.5s;
}
.toolPackLeftZoom {
  left: 64px;
}
.toolPackRightZoom,
.toolEditZoom {
  right: 64px;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
}
</style>
