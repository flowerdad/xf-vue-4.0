<template>
  <div class="tools">
    <div class="tool-block tool-top">
      <ul>
        <li @click="backCard">
          <span class="size-22 font-color"><i class="el-icon-star-on"></i></span>
        </li>
        <li v-for="(item, index) in toolList" :key="index" @click="toTool(item.module,index)">
          <span class="size-22 font-color"><i :class="item.icon"></i></span>
        </li>
        <li @click="toolAdd">
          <span class="size-22 font-color"><i class="el-icon-circle-plus"></i></span>
        </li>
      </ul>
    </div>

    <div class="tool-block tool-bottom">
      <ul>
        <li v-for="(item, index) in blockBottom" :key="index">
          <span class="size-22 font-color"><i :class="item.icon"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      blockBottom: [
        {
          icon: "el-icon-eleme",
          id: 1
        },
        {
          icon: "el-icon-eleme",
          id: 2
        },
        {
          icon: "el-icon-eleme",
          id: 2
        }
      ],
      toolList: this.$store.state.permissions.toolsConfig[1].tool
    };
  },
  methods: {
    backCard() {
      this.$store.commit("mapPack", false);
      this.$store.commit("toolPackRight", false);
      this.$store.commit("cardPackRight", false);
    },
    toTool(modules) {
      this.$store.commit("mapPack", false);
      this.$store.commit("cardPackRight", true);
      this.$store.commit("toolPackRight", false);
      setTimeout(() => {
        this.$store.commit("toolPackRight", true);
        this.$store.commit("toolRightModule", modules);
      }, 300);
    },
    toolAdd() { }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.tools {
  width: 64px;
  transition: all 0.5s;
  height: calc(100vh - 64px);
  @include themify($themes) {
    background: themed("tools-back");
  }
}

.tool-bottom {
  bottom: 0px;
}
</style>
