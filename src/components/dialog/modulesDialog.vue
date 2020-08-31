<template>
  <el-drawer title="模块管理" :visible.sync="visible" custom-class="drawer-modules" size="calc(100vw - 768px)" direction="ltr" @close="$emit('update:show', false)" :modal="false">
    <div>
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="item.type" :name="item.id" v-for="item in vConfig.modules" :key="item.id"></el-tab-pane>
        </el-tabs>
      </template>
      <el-row :gutter="10">
        <draggable v-bind="dragOptions" @end="draggableEnd" :list="modules" class="draggable">
          <transition-group>
            <el-col :class="item.undraggable?'undraggable':''" :type='item.type' :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="item in modules" :key="item.id">
              <el-card class="box-card modules-card" :id="item.type">
                <div>
                  <i class="size-32 whites-color-50" :class="item.icon"></i>
                </div>
                <div class="size-16 whites-color-50">{{ item.title }}</div>
                <div class="size-12 whites-color-50">{{ item.describe }}</div>
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
        disabled: false,
        filter: '.undraggable'
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
    },
    $route: {
      handler: function () {
        this.initModules(this.activeName);
        this.checkingModules();
      },
      deep: true
    },
  },
  methods: {
    handleClick() {
      this.initModules(this.activeName);
    },
    draggableEnd() {
      this.initModules(this.activeName);
      this.checkingModules();
    },
    initModules(id) {
      this.modules = []
      this.vConfig.modules.forEach(element => {
        if (id == element.id) {
          this.modules = element.module;
        }
      });
      this.checkingModules();
    },
    checkingModules() {
      let config = JSON.parse(localStorage.getItem("config"));
      let left = []
      let right = []
      for (let i = 0; i < config.projectConfig.length; i++) {
        const modules = config.projectConfig[i];
        if (modules.path == this.$route.path) {
          left = modules.modules[0].left;
          right = modules.modules[1].right;
          break;
        }
      }
      left.push.apply(left, right);
      this.modules.forEach(element => {
        element.undraggable = false;
        for (let i = 0; i < left.length; i++) {
          if (element.type == left[i]) {
            element.undraggable = true;
            break;
          }
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
.undraggable .el-card {
  background: #bfbfbf;
}
</style>
