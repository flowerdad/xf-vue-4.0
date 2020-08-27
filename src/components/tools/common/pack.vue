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
      // modules: [],
      dragOptions: {
        animation: 300,
        group: "toolModule",
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
    modules: Array
  },
  methods: {
    draggableEnd() {
    },
    draggableAdd() {
    },
    draggableUpdate() {
    }
  }
};
</script>

<style scoped>
.cardPack {
  width: 320px;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.5);
  /* position: absolute; */
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
    background: themed("darken");
  }
}
</style>
