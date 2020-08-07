<template>
  <div class="tools">
    <div class="tool-block tool-top">
      <ul>
        <li v-for="(item, index) in vConfig.tools[1].tool" :key="index" @click="toTool(item.module)">
          <span class="size-22 font-color"><i :class="item.icon"></i></span>
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
      ]
    };
  },
  methods: {
    toTool(modules) {
      console.log(modules);
    }
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
