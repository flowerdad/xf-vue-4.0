<template>
  <div class="home">
    <!-- <mainMap type="main" /> -->
    <toolLeft class="toolLeft" />
    <toolRight class="toolRight" />
    <toolBottom class="toolBottom" />
    <toolMap class="toolMap" :class="cardPackZoom ? 'toolMapZoom' : ''" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import mainMap from "@/components/map/map";
import toolLeft from "@/components/tools/toolLeft";
import toolRight from "@/components/tools/toolRight";
import toolBottom from "@/components/tools/toolBottom";
import toolMap from "@/components/tools/toolMap";
export default {
  name: "home",
  components: {
    // mainMap,
    toolLeft,
    toolRight,
    toolBottom,
    toolMap
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cardPackZoom"]),
    cardPackZoom() {
      return this.$store.state.notice.cardPackZoom;
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
.toolBottom {
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
</style>
