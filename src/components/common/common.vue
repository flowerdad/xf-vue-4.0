<template>
  <div class="home">
    <mainMap />
    <toolLeft class="toolLeft" />
    <toolRight class="toolRight" />
    <toolBottom class="toolBottom" />
  </div>
</template>

<script>
import mainMap from "@/components/map/map";
import toolLeft from "@/components/tools/toolLeft";
import toolRight from "@/components/tools/toolRight";
import toolBottom from "@/components/tools/toolBottom";
export default {
  name: "home",
  components: {
    mainMap,
    toolLeft,
    toolRight,
    toolBottom
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.toolLeft {
  position: absolute;
  left: 0px;
  top: 0px;
}
.toolRight {
  position: absolute;
  right: 0px;
  top: 0px;
}
.toolBottom {
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>
