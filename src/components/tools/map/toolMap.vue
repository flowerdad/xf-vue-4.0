<template>
  <div class="tools">
    <div class="tool-block tool-map">
      <ul>
        <template v-for="(item, index) in packMap">
          <li @click="toolsClick(item.methods)" :key="index">
            <span class="size-16 font-color"><i :class="item.icon"></i></span>
          </li>
        </template>
      </ul>
    </div>
    <modulesDialog :show.sync="settingModulesShow" />
  </div>
</template>

<script>
import modulesDialog from "@/components/dialog/modulesDialog.vue/";
export default {
  data() {
    return {
      zoom: false,
      settingModulesShow: false,
      packMap: [
        {
          icon: "el-icon-s-tools",
          id: 1,
          methods: "settingModules"
        },
        {
          icon: "el-icon-eleme",
          id: 2
        },
        {
          icon: "el-icon-eleme",
          id: 3
        },
        {
          icon: "el-icon-full-screen",
          id: 4,
          methods: "zoomMethod"
        }
      ]
    };
  },
  components: {
    modulesDialog
  },
  methods: {
    toolsClick(methodsWords) {
      this[methodsWords]();
    },
    zoomMethod() {
      this.zoom = !this.zoom;
      if (this.zoom) {
        this.$store.commit("cardPackLeft", true);
        this.$store.commit("cardPackRight", true);
        this.$store.commit("mapPack", true);
        this.$store.commit("toolPackLeft", false);
        this.$store.commit("toolPackRight", false);
      } else {
        this.$store.commit("cardPackLeft", false);
        this.$store.commit("cardPackRight", false);
        this.$store.commit("mapPack", false);
        this.$store.commit("toolPackLeft", false);
        this.$store.commit("toolPackRight", false);
      }
    },
    settingModules() {
      this.settingModulesShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";

.tools {
  width: 16px;
  transition: all 0.5s;
}

.tool-map {
  bottom: 0px;
}

.tool-block {
  position: absolute;
  ul {
    width: 100%;
    li {
      height: 32px;
      width: 32px;
      text-align: center;
      display: table;
      border-radius: 3px;
      margin-top: 16px;
      @include themify($themes) {
        background: themed("tools-back");
      }
      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
</style>
