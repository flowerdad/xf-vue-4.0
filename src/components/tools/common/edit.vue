<template>
  <div class="cardPack">
    <div class="margin-12">
      <p class="edit-title">自定义边栏</p>
      <draggable v-bind="dragOptions" @end="draggableEnd" @add="draggableAdd" @update="draggableUpdate" class="draggable">
        <transition-group>
          <el-row v-for="item in editList" :key="item.type" class='edit-item radius-12 margin-middle-12 normal-back-100 primary-color-50'>
            <el-col :span="18">
              <div>
                <span class="size-32 font-color"><i class="el-icon-eleme"></i></span>
                <span>名称</span>
                <span>介绍</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span class="size-32 font-color"><i class="el-icon-eleme"></i></span>
                <span>名称</span>
              </div>
            </el-col>
          </el-row>
        </transition-group>
      </draggable>
    </div>
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
      isDraggableUpdate: false,
      editList: this.vConfig.tools[0].tool
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
.edit-item {
  height: 80px;
}
.cardPack {
  width: 320px;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.5);
  /* position: absolute; */
  /* padding: 12px; */
}
/* .cardPack > div {
  margin: 12px;
} */
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
@import "@/assets/styles/theme/theme";
.cardPack {
  @include themify($themes) {
    background: themed("darken");
  }
}
// .edit-item {
//   @include themify($themes) {
//     background: themed("normal");
//   }
// }
.edit-title {
  @include themify($themes) {
    color: themed("whites");
  }
}
</style>
