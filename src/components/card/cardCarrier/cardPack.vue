<template>
  <div class="cardPack">
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
      return this.$store.state.isdraggableEnd;
    }
  },
  props: {
    type: String
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
    },
    updateModules() {
      let obj = JSON.parse(localStorage.getItem("modules"));
      obj[this.$route.path].forEach(element => {
        if (element[this.type]) {
          element[this.type] = this.modules;
        }
      });
      localStorage.modules = JSON.stringify(obj);
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
  height: calc(100vh - 64px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.ghost {
  /* border: 1px solid red; */
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
