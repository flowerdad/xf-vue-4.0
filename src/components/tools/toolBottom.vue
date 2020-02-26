<template>
  <div class="tools">
    <div class="tool-nav">
      <ul>
        <li v-for="(item, index) in nav" :key="index">
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
      nav: [
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
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.tools {
  width: 100%;
  height: 64px;
  text-align: center;
  @include themify($themes) {
    background: themed("tools-back");
  }
}
.tool-nav {
  display: inline-block;
}
.tool-nav ul li {
  height: 64px;
  width: 64px;
  text-align: center;
  display: table;
  float: left;
  span {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
