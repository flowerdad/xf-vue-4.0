<template>
  <div class="cardPack">
    <div class="padding-center-12 height-20 padding-middle-20">
      <span class="size-14 whites-color-75 inline-block margin-top-2">实时报警</span>
      <div class="float-right">
        <span class="inline-block blacks-back-10 radius-8 width-24 height-24 center"><i class="margin-top-5 size-14 el-icon-menu primary-color-100"></i></span>
        <span class="inline-block blacks-back-10 radius-8 width-24 height-24 center margin-left-5"><i class="margin-top-5 size-14 el-icon-close danger-color-100"></i></span>
      </div>
    </div>
    <draggable v-bind="dragOptions" @end="draggableEnd" @add="draggableAdd" @update="draggableUpdate" class="draggable">
      <transition-group>
        <component :type='item' v-bind:is="item" v-for="item in modules" :key="item"></component>
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
      modules: [],
      dragOptions: {
        animation: 300,
        group: "description",
        ghostClass: "ghost",
        disabled: false
      },
      isDraggableUpdate: false
    };
  },
  computed: {
    isdraggableEnd() {
      return this.$store.state.notice.isdraggableEnd;
    }
  },
  props: {
    type: String
  },
  methods: {
    initModules() {
      // 取modulees动态加载配置模块
      let config = JSON.parse(localStorage.getItem("config"));
      for (let i = 0; i < config.projectConfig.length; i++) {
        const modules = config.projectConfig[i];
        if (modules.path == this.$route.path) {
          modules.modules.forEach(element => {
            if (element[this.type]) {
              this.modules = element[this.type];
            }
          });
          break;
        }
      }
    },
    updateModules() {
      let config = JSON.parse(localStorage.getItem("config"));
      for (let i = 0; i < config.projectConfig.length; i++) {
        const modules = config.projectConfig[i];
        if (modules.path == this.$route.path) {
          modules.modules.forEach(element => {
            if (element[this.type]) {
              element[this.type] = this.modules;
            }
          });
          break;
        }
      }
      localStorage.config = JSON.stringify(config);
    },
    draggableEnd(evt) {
      if (this.isdraggableEnd) {
        if (!this.isDraggableUpdate) {
          let oldIndex = evt.oldIndex;
          this.modules.splice(oldIndex, 1)
        }
        this.updateModules(evt);
        this.isDraggableUpdate = false;
      }
      this.$store.commit("isdraggableEnd", false);
    },
    draggableAdd(evt) {
      this.$store.commit("isdraggableEnd", true);
      this.modules.unshift(evt.item.getAttribute('type'));
      this.updateModules(evt);
    },
    draggableUpdate(evt) {
      this.$store.commit("isdraggableEnd", true);
      this.isDraggableUpdate = true;
      this.modules.splice(evt.newIndex, 1, ...this.modules.splice(evt.oldIndex, 1, this.modules[evt.newIndex]))
      this.updateModules(evt);
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
.draggable > span {
  display: inline-block;
  height: calc(100vh - 124px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.ghost {
  /* border: 1px solid red; */
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/theme/theme";
.cardPack {
  @include themify($themes) {
    background: themed("darken");
  }
}
</style>
