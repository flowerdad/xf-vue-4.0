<template>
  <div class="tools">
    <div class="tool-nav">
      <ul>
        <template v-for="(item, index) in nav">
          <li :key="index" v-if="item.nav" @click="toPath(item)">
            <span class="size-22 font-color"><i :class="item.icon"></i></span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: this.$store.state.permissions.menuList
    };
  },
  methods: {
    toPath(item) {
      this.$router.push(item.path);
    }
  },
  mounted() {
    // console.log(this.nav);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.tools {
  width: 100%;
  height: 64px;
  text-align: center;
  transition: all 0.5s;
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
