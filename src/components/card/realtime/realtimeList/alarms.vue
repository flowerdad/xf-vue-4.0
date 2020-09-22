<template>
  <cardBlock>
    <div slot="body">
      <div>
        <div class="inline-block border-2 danger-border-75 danger-back-100 padding-3 padding-center-5 border-top-left-radius-8 border-bottom-left-radius-8 center">
          <p class="size-12 blacks-color-100 bold"><i class="el-icon-platform-eleme"></i> 16</p>
        </div>
        <div class="inline-block border-2 danger-border-100 danger-back-25 padding-3 padding-center-5 border-top-right-radius-8 border-bottom-right-radius-8 center">
          <p class="size-12 danger-color-100 bold">警报</p>
        </div>
        <div class="inline-block float-right">
          <p class="size-12 whites-color-75 margin-top-8 bold"><i class="el-icon-platform-eleme danger-color-100"></i> 00:12:45</p>
        </div>
      </div>

      <div class="margin-top-7">
        <div class="inline-block">
          <p class="size-14 whites-color-100">洋湖壹号3号楼12层1207室展示厅</p>
          <div class="margin-top-6">
            <div class="inline-block danger-border-75 blacks-back-10 padding-4 padding-center-5 radius-8 center margin-right-5 pointer">
              <p class="size-12 whites-color-50"><i class="el-icon-platform-eleme primary-color-100"></i> 钜升畅安</p>
            </div>
            <div class="inline-block danger-border-75 blacks-back-10 padding-4 padding-center-5 radius-8 center pointer">
              <p class="size-12 whites-color-50"><i class="el-icon-platform-eleme whites-color-100"></i> 图像</p>
            </div>
          </div>
        </div>
        <div class="inline-block float-right">
          <div class="inline-block danger-border-75 blacks-back-10 padding-5 padding-center-12 radius-8 center">
            <p class="size-18 danger-color-100"><i class="el-icon-platform-eleme"></i></p>
            <p class="size-12 danger-color-100 bold">报警</p>
          </div>
        </div>
      </div>

      <div class="margin-top-7 width%-100">
        <div class="danger-border-75 blacks-back-10 padding-4 padding-center-5 radius-8 center-left">
          <p class="size-12 whites-color-70"><span class="whites-color-50">灭火力量：</span>距岳麓区消防区<span class="primary-color-100">12</span>公里 约<span class="success-color-100">15分钟</span></p>
        </div>
      </div>

      <div class="margin-top-7">
        <div class="inline-block center margin-right-16">
          <p class="size-12 whites-color-75 bold"><i class="el-icon-platform-eleme"></i> 2</p>
        </div>
        <div class="inline-block center margin-right-16">
          <p class="size-12 whites-color-75 bold"><i class="el-icon-platform-eleme"></i> 2</p>
        </div>
        <div class="inline-block center margin-right-16">
          <p class="size-12 whites-color-75 bold"><i class="el-icon-platform-eleme"></i> 2</p>
        </div>
        <div class="inline-block center margin-right-16">
          <p class="size-12 whites-color-75 bold"><i class="el-icon-platform-eleme"></i> 2</p>
        </div>
        <div class="inline-block center margin-right-16">
          <p class="size-12 whites-color-75 bold"><i class="el-icon-platform-eleme"></i> 2</p>
        </div>
      </div>
    </div>
  </cardBlock>
</template>

<script>
import cardBlock from "@/components/card/common/cardBlock.vue";
export default {
  components: {
    cardBlock
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
  }
};
</script>
