<template>
  <div class="tools">
    <div class="tool-block tool-top">
      <ul>
        <li @click="backCard">
          <span class="size-22 whites-color-50"><i class="el-icon-star-on"></i></span>
        </li>
        <li class="" :class="toolActive == index ? 'tool-active': ''" v-for="(item, index) in toolList" :key="index" @click="toTool(item.module,index)">
          <span class="size-22 whites-color-50"><i :class="item.icon"></i></span>
        </li>
        <li @click="toolAdd">
          <span class="size-22 whites-color-50"><i class="el-icon-circle-plus"></i></span>
        </li>
      </ul>
    </div>

    <div class="tool-block tool-bottom">
      <ul>
        <li v-for="(item, index) in blockBottom" :key="index">
          <span class="size-22 whites-color-50"><i :class="item.icon"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      toolActive: -1,
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
      toolList: []
    };
  },
  computed: {
    ...mapGetters(["toolsConfig"]),
    toolsConfig() {
      return this.$store.state.permissions.toolsConfig
    }
  },
  watch: {
    toolsConfig() {
      this.init();
    }
  },
  methods: {
    init() {
      this.toolList = [];
      this.toolsConfig[1].tool.forEach(lt => {
        this.vConfig.tools[1].tool.forEach(pt => {
          if (lt.type == pt.type) {
            if (lt.display) {
              this.toolList.push(pt)
            }
          }
        });
      });
    },
    backCard() {
      this.toolActive = -1;
      this.$store.commit("mapPack", false);
      this.$store.commit("toolPackRight", false);
      this.$store.commit("toolEdit", false);
      setTimeout(() => {
        this.$store.commit("cardPackRight", true);
      }, 300);
    },
    toTool(modules, index) {
      this.toolActive = index;
      this.$store.commit("mapPack", false);
      this.$store.commit("toolEdit", false);
      this.$store.commit("cardPackRight", false);
      this.$store.commit("toolPackRight", false);
      setTimeout(() => {
        this.$store.commit("toolPackRight", true);
        this.$store.commit("toolRightModule", modules);
      }, 300);
    },
    toolAdd() {
      this.toolActive = -1;
      this.$store.commit("toolPackRight", false);
      this.$store.commit("cardPackRight", false);
      this.$store.commit("mapPack", false);
      setTimeout(() => {
        this.$store.commit("toolEdit", true);
      }, 300);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme/theme";
.tools {
  width: 64px;
  transition: all 0.5s;
  height: calc(100vh - 64px);
  @include themify($themes) {
    background: themed("normal");
  }
}

.tool-active {
  @include themify($themes) {
    background: themed("darken");
  }
}

.tool-bottom {
  bottom: 0px;
}
</style>
