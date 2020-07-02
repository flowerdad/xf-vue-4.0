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
      cardPackZoom: false,
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
          methods: "cardPackZoomMethod"
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
    cardPackZoomMethod() {
      this.cardPackZoom = !this.cardPackZoom;
      this.$store.commit("cardPackZoom", this.cardPackZoom);
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
