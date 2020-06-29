<template>
  <div class="cardPack">
    <draggable v-bind="dragOptions" :list="modules">
      <transition-group>
        <!-- <p>13154165561</p> -->
        <component v-bind:is="item" v-for="item in modules" :key="item"></component>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      modules: []
    };
  },
  props: {
    type: String
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: "description"
        // ghostClass: "ghost"
      };
    }
  },
  methods: {
    initModules() {
      // 取modulees动态加载配置模块
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
