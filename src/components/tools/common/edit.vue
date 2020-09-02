<template>
  <div class="cardPack darken-back-100">
    <div class="margin-12">
      <p class="whites-color-75 size-14">已启用 <i class=" float-right size-18 pointer" :class="edit ? 'el-icon-success':'el-icon-menu'" @click="draggEdit"></i></p>
      <draggable :options="dragPlus" v-model="editPlusList" @update="draggableUpdate" class="draggable">
        <transition-group>
          <el-row v-for="item in editPlusList" :key="item.type" :class='item.draggable ? "" : "draggable-draggable"' class='edit-item height-80 radius-12 margin-middle-8 normal-back-100 whites-color-50'>
            <el-col :span="18">
              <div class="inline-block">
                <span class="size-40 whites-color-50 inline-block margin-top-19 margin-center-12"><i :class="item.icon"></i></span>
              </div>
              <div class="inline-block">
                <p class="whites-color-75 size-14">{{item.name}}</p>
                <p class="whites-color-50 size-13">{{item.introduce}}</p>
              </div>
            </el-col>
            <el-col :span="6" class="height%-100 light-back-100 border-top-right-radius-12 border-bottom-right-radius-12">
              <div class="inline-block width%-100 center">
                <span class="size-20 whites-color-50 inline-block margin-top-30">
                  <i @click="remove(item)" :class="[edit ? 'el-icon-s-flag':'el-icon-remove', edit ? item.draggable ? 'primary-color-50':'primary-color-100': item.draggable ? 'danger-color-50':'danger-color-100']" class="pointer"></i>
                </span>
              </div>
            </el-col>
          </el-row>
        </transition-group>
      </draggable>
      <p class="whites-color-75 size-14">未启用</p>
      <draggable v-bind="dragRemove" class="draggable">
        <transition-group>
          <el-row v-for="item in editRemoveList" :key="item.type" class='edit-item height-80 radius-12 margin-middle-8 normal-back-100 whites-color-50'>
            <el-col :span="18">
              <div class="inline-block">
                <span class="size-40 whites-color-50 inline-block margin-top-19 margin-center-12"><i :class="item.icon"></i></span>
              </div>
              <div class="inline-block">
                <p class="whites-color-75 size-14">{{item.name}}</p>
                <p class="whites-color-50 size-13">{{item.introduce}}</p>
              </div>
            </el-col>
            <el-col :span="6" class="height%-100 light-back-100 border-top-right-radius-12 border-bottom-right-radius-12">
              <div class="inline-block width%-100 center">
                <span class="size-20 whites-color-50 inline-block margin-top-30"><i @click="plus(item)" :class="[edit ? 'el-icon-s-flag':'el-icon-circle-plus',edit ? 'blacks-color-30':'success-color-100']" class="pointer"></i></span>
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
      edit: false,
      dragPlus: {
        animation: 300,
        group: "dragPlus",
        disabled: true,
        draggable: ".draggable-draggable"
      },
      dragRemove: {
        animation: 300,
        group: "dragRemove",
        disabled: true
      },
      isDraggableUpdate: false,
      editPlusList: [],
      editRemoveList: []
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
    init() {
      this.editPlusList = [];
      this.editRemoveList = [];
      JSON.parse(localStorage.getItem("config")).toolsConfig[1].tool.forEach(lt => {
        this.vConfig.tools[1].tool.forEach(pt => {
          if (lt.type == pt.type) {
            if (lt.display) {
              this.editPlusList.push(pt)
            } else {
              this.editRemoveList.push(pt)
            }
          }
        });
      });
    },
    draggEdit() {
      if (this.edit) {
        this.edit = false
        this.dragPlus.disabled = true;
        this.$store.commit("mask", 'close');
      } else {
        this.edit = true
        this.dragPlus.disabled = false;
        this.$store.commit("mask", 'draggEdit');
      }
    },
    remove(item) {
      if (!this.edit && !item.draggable) {
        this.editRemoveList.push(item);
        this.editPlusList.splice(this.editPlusList.indexOf(item), 1)
        this.updateEdit();
      }
    },
    plus(item) {
      if (!this.edit && !item.draggable) {
        this.editPlusList.push(item)
        this.editRemoveList.splice(this.editRemoveList.indexOf(item), 1)
        this.updateEdit();
      }
    },
    draggableUpdate() {
      this.updateEdit();
    },
    updateEdit() {
      let config = JSON.parse(localStorage.getItem("config"));
      let dp = [], er = [];
      this.editPlusList.forEach(element => {
        dp.push({
          id: element.id,
          type: element.type,
          display: true
        })
      });
      this.editRemoveList.forEach(element => {
        er.push({
          id: element.id,
          type: element.type,
          display: false
        })
      });
      config.toolsConfig[1].tool = dp.concat(er);
      this.$store.commit("toolsConfig", config.toolsConfig);
      localStorage.config = JSON.stringify(config);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.cardPack {
  width: 320px;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.5);
}

.edit-item {
  transition: background 0.3s;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/theme/theme";
.edit-item:hover {
  @include themify($themes) {
    background: themed("light");
  }
}
</style>
