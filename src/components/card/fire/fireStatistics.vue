<template>
  <div>
    <cardBlock>
      <div slot="body">
        <div>
          <div class="inline-block">
            <p class="size-40 danger-color-100 margin-top-8"><i class=" el-icon-platform-eleme"></i> 43</p>
            <p class="size-13 whites-color-50 margin-top-6">实时报警数量 <i class="el-icon-refresh-right primary-color-100"></i></p>
          </div>
          <div class="inline-block float-right">
            <div ref="solveRate" class="width-80 height-80"></div>
          </div>
        </div>
        <div class="blacks-back-10 radius-12 padding-12 margin-top-12">
          <p class="size-13 whites-color-75"><i class=" el-icon-platform-eleme danger-color-100"></i> 风险解决率偏低，请及时处理。</p>
          <p class="size-13 whites-color-75"> echarts-暂无</p>
        </div>
      </div>
    </cardBlock>
  </div>
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
    solveRate(data) {
      let echart = {
        dom: this.$refs.solveRate,
        title: {
          text: data + '%',
          subtext: '解决率',
          textStyle: {
            color: '#FD4E64'
          },
        },
        series: {
          value: data,
          color: '#FD4E64'
        }
      };
      this.vEcharts.echarts.singlePie(echart);
    }
  },
  mounted() {
    this.solveRate(50)
  }
};
</script>
