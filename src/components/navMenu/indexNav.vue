<template>
  <div>
    <template v-for="item in mune">
      <el-button :key="item.name" v-if="item.hidden" @click="toPath(item)">{{
        item.name
      }}</el-button>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mune: this.$store.state.menuList
    };
  },
  methods: {
    toPath(item) {
      this.$router.push(item.path);
    }
  }
};
</script>
