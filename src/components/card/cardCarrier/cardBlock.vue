<template>
  <div class="cardBlock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <p style="float: right; padding: 3px 0" type="text">操作按钮</p>
      </div>
      <slot name="body"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.cardBlock {
  position: relative;
  margin: 10px 0px;
}
</style>
