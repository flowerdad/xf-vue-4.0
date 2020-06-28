<template>
  <div class="cardPack">
    <component v-bind:is="item" v-for="item in modules" :key="item"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: []
    };
  },
  props: {
    type: String
  },
  methods: {
    initModules() {
      let obj = JSON.parse(localStorage.getItem("modules"));
      obj[this.$route.path].forEach(element => {
        if (element[this.type]) {
          this.modules = element[this.type];
        }
      });
    }
  },
  mounted() {
    this.initModules();
  }
};
</script>

<style scoped>
.cardPack {
  width: 320px;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/theme";
.cardPack {
  @include themify($themes) {
    background: themed("cardPack-back");
  }
}
</style>
