<template>
  <div class="cardBlock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
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
  padding: 10px 0px;
  width: 100%;
}
</style>
