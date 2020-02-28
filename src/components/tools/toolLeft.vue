<template>
  <div class="tools">
    <div class="tool-block tool-top">
      <div class="logo">
        <span class="size-32 font-color"><i class="el-icon-eleme"></i></span>
      </div>
      <ul>
        <li v-for="(item, index) in blockTop" :key="index">
          <span class="size-22 font-color"><i :class="item.icon"></i></span>
        </li>
      </ul>
    </div>

    <div class="tool-block tool-bottom">
      <ul>
        <template v-for="(item, index) in blockBottom">
          <li @click="toolsClick(item.methods)" :key="index">
            <span class="size-22 font-color"><i :class="item.icon"></i></span>
          </li>
        </template>
      </ul>
    </div>
    <drawerTheme :show.sync="theme" />
  </div>
</template>

<script>
import drawerTheme from "@/components/drawer/drawerTheme.vue/";
export default {
  data() {
    return {
      theme: false,
      blockTop: [
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
      blockBottom: [
        {
          icon: "el-icon-goods",
          id: 1,
          methods: "themeShow"
        },
        {
          icon: "el-icon-eleme",
          id: 2
        },
        {
          icon: "el-icon-eleme",
          id: 3
        }
      ]
    };
  },
  components: {
    drawerTheme
  },
  methods: {
    toolsClick(methodsWords) {
      this[methodsWords]();
    },
    themeShow() {
      this.theme = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.tools {
  width: 64px;
  height: calc(100vh - 64px);
  @include themify($themes) {
    background: themed("tools-back");
  }
}

.tool-bottom {
  bottom: 0px;
}

.logo {
  height: 64px;
  width: 64px;
  text-align: center;
  display: table;
  span {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
