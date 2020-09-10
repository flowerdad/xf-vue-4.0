<template>
  <el-drawer :visible.sync="visible" direction="ltr" @close="$emit('update:show', false)" :modal='false'>
    <div>
      <template v-for="(item, index) in styles">
        <button :key="index" class="style-button" :class="item.class" @click="styleSwitch(item.type)"></button>
      </template>
    </div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      styles: [
        {
          class: "style-default",
          type: "defalut"
        },
        {
          class: "style-red",
          type: "red"
        },
        {
          class: "style-blue",
          type: "blue"
        },
        {
          class: "style-green",
          type: "green"
        },
        {
          class: "style-324467",
          type: "324467"
        }
      ]
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
    styleSwitch(type) {
      this.$store.commit("theme", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.style-button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 100px;
  margin: 0px 10px;
}
.style-default {
  background: #282b35;
}
.style-red {
  background: red;
}
.style-blue {
  background: blue;
}
.style-green {
  background: green;
}
</style>
