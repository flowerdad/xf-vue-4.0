<template>
  <div>
    <cardBlock tittle="echarts 测试模块">
      <div slot="body">
        <div>
          <div class="v-echart" ref="singlePie"></div>
          <div class="v-echart" ref="multinomialPie"></div>
          <div class="v-echart" ref="singleBarX"></div>
          <div class="v-echart" ref="singleBarY"></div>
        </div>
      </div>
    </cardBlock>
  </div>
</template>

<script>
import cardBlock from "@/components/card/cardCarrier/cardBlock.vue";
export default {
  components: {
    cardBlock
  },
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
  },
  mounted() {
    let singlePie = {
      dom: this.$refs.singlePie,
      title: {
        text: '50.2%',
        subtext: '单项饼图',
        // top: '45%'
      },
      series: {
        value: 50,
      }
    };
    this.vEcharts.echarts.singlePie(singlePie);

    let multinomialPie = {
      dom: this.$refs.multinomialPie,
      title: {
        text: '多项饼图'
      },
      series: {
        backgroundStyle: '#333846',
        data: [{
          value: 20,
          color: '#FFBB00'
        }, {
          value: 50,
          color: '#F56C6C'
        }, {
          value: 70,
          color: '#006C6C'
        }]
      }
    };
    this.vEcharts.echarts.multinomialPie(multinomialPie);

    let singleBarX = {
      dom: this.$refs.singleBarX,
      series: {
        data: [{
          name: '在线',
          value: 20,
        }, {
          name: '故障',
          value: 50,
        }, {
          name: '报警',
          value: 70,
        }]
      }
    };
    this.vEcharts.echarts.singleBar(singleBarX);

    let singleBarY = {
      dom: this.$refs.singleBarY,
      type: 'y',
      series: {
        data: [{
          name: '在线',
          value: 20,
        }, {
          name: '故障',
          value: 50,
        }, {
          name: '报警',
          value: 70,
        }]
      }
    };
    this.vEcharts.echarts.singleBar(singleBarY);

  }
};
</script>

<style lang="scss" scoped>
.v-echart {
  display: inline-block;
  width: 100%;
  height: 100px;
  margin: 10px 0px;
}
</style>
