<template>
  <el-drawer title="模块管理" :visible.sync="visible" custom-class="drawer-modules" size="calc(100vw - 768px)" direction="ltr" @close="$emit('update:show', false)" :modal="false">
    <div>
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="item.type" :name="item.id" v-for="item in vModules" :key="item.id"></el-tab-pane>
        </el-tabs>
      </template>
      <el-row :gutter="10">
        <draggable v-bind="dragOptions" :list="modules" class="draggable">
          <transition-group>
            <el-col :type='item.type' :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="item in modules" :key="item.id">
              <el-card class="box-card modules-card" :id="item.type">
                <div>
                  <i class="size-32 font-color" :class="item.icon"></i>
                </div>
                <div class="size-16 font-color">{{ item.title }}</div>
                <div class="size-12 font-color">{{ item.describe }}</div>
              </el-card>
            </el-col>
          </transition-group>
        </draggable>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      visible: this.show,
      activeName: "1",
      dragOptions: {
        animation: 300,
        sort: false,
        group: { name: "description", pull: "clone", put: false },
        ghostClass: "ghost",
        disabled: false
      },
      modules: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    handleClick() {
      this.initModules(this.activeName);
    },
    draggableEnd(evt) {
      console.log(evt.item.attr('type'));
      // evt.item.style.width = '100%'
    },
    initModules(id) {
      this.vModules.forEach(element => {
        if (id == element.id) {
          this.modules = element.module;
        }
      });
    }
  },
  mounted() {
    this.initModules(1);
  }
};
</script>

<style lang="scss" scoped>
.el-drawer__wrapper {
  width: calc(100vw - 768px);
  height: calc(100vh - 64px);
  left: 384px;
}
.modules-card {
  margin-bottom: 10px;
}
</style>

<style lang="scss">
.drawer-modules {
  background: #cacaca !important;
  .el-drawer__body {
    padding: 20px;
  }
  .el-drawer__header {
    margin-bottom: 0px;
    > span {
      border: none !important;
    }
  }
}
</style>
