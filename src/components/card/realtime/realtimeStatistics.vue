<template>
  <div>
    <cardBlock>
      <div slot="body">
        <div>
          <div class="inline-block">
            <p class="en-size-40 danger-color-100 margin-top-8"><i class="iconfont iconApp_Arlam_Line"></i> 43</p>
            <p class="size-13 whites-color-50 margin-top-6">实时报警数量 <i class="el-icon-refresh-right primary-color-100 pointer"></i></p>
          </div>
          <div class="inline-block float-right">
            <div ref="EsolveRate" class="width-80 height-80"></div>
          </div>
        </div>
        <div class="blacks-back-10 radius-12 padding-12 margin-top-12">
          <p class="size-13 whites-color-75"><i class=" el-icon-platform-eleme danger-color-100"></i> 风险解决率偏低，请及时处理。</p>
          <div ref="Eproportion" class="width%-100 height-36 margin-top-10"></div>
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
    EsolveRate(data) {
      let echart = {
        dom: this.$refs.EsolveRate,
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
    },
    Eproportion() {
      let echart = {
        dom: this.$refs.Eproportion,
        legend: {
          data: ['火情', '报警', '故障', '隐患', '危险品'],
        },
        series: [{
          name: '火情',
          data: [56],
          itemStyle: {
            normal: {
              color: "#FD4E64"
            }
          }
        }, {
          name: '报警',
          data: [76],
          itemStyle: {
            normal: {
              color: "rgba(253, 78, 100, 0.75)"
            }
          }
        }, {
          name: '故障',
          data: [50],
          itemStyle: {
            normal: {
              color: "rgba(253, 78, 100, 0.5)"
            }
          }
        }, {
          name: '隐患',
          data: [35],
          itemStyle: {
            normal: {
              color: "rgba(255, 178, 16, 0.75)"
            }
          }
        }, {
          name: '危险品',
          data: [99],
          itemStyle: {
            normal: {
              color: "rgba(255, 255, 255, 0.5)"
            }
          }
        }]
      };
      this.vEcharts.echarts.transverseBar(echart);
    }
  },
  mounted() {
    this.EsolveRate(17.3);
    this.Eproportion();
  }
};
</script>
