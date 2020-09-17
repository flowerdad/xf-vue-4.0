<template>
  <div>
    <cardBlock title="echarts 测试模块">
      <div slot="body">
        <div>
          <div class="v-echart v-echart-50" ref="singlePie"></div>
          <div class="v-echart v-echart-50" ref="multinomialPie"></div>
          <div class="v-echart" ref="createrBarX"></div>
          <div class="v-echart" ref="createrBarY"></div>
          <div class="v-echart" ref="createrBarXmax"></div>
          <div class="v-echart" ref="createrBarYmax"></div>
          <div class="v-echart" ref="line"></div>
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

    let createrBarX = {
      dom: this.$refs.createrBarX,
      seriesName: ['洋湖1号', '洋湖2号', '洋湖3号'],
      series: [{
        barWidth: 20,
        data: [{
          value: 759
        }, {
          value: 559
        }, {
          value: 259
        }]
      }]
    };
    this.vEcharts.echarts.createrBar(createrBarX);

    let createrBarY = {
      dom: this.$refs.createrBarY,
      type: 'y',
      seriesName: ['洋湖1号', '洋湖2号', '洋湖3号'],
      series: [{
        name: '在线',
        data: [{
          value: 759
        }, {
          value: 559
        }, {
          value: 259
        }]
      }]
    };
    this.vEcharts.echarts.createrBar(createrBarY);

    let createrBarXmax = {
      dom: this.$refs.createrBarXmax,
      seriesName: ['洋湖1号', '洋湖2号', '洋湖3号'],
      tooltip: {
        trigger: 'axis',
        formatter: function (val) {
          return `${val[0].name}<br/>
                    <span style="color:#FFBB00;">   ● </span>${val[0].seriesName}: ${val[0].value}<br/>
                    <span style="color:#FC1E53;">   ● </span>${val[1].seriesName}: ${val[1].value}<br/>
                    <span style="color:#8BDC85;">   ● </span>${val[1].seriesName}: ${val[2].value}`
        }
      },
      series: [{
        name: '在线',
        barWidth: 10,
        data: [{
          value: 759,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }, {
          value: 559,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }, {
          value: 259,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }]
      }, {
        name: '隐患',
        barWidth: 10,
        data: [{
          value: 265,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }, {
          value: 459,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }, {
          value: 365,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }]
      }, {
        name: '报警',
        barWidth: 10,
        data: [{
          value: 546,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }, {
          value: 125,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }, {
          value: 999,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }]
      }]
    };
    this.vEcharts.echarts.createrBar(createrBarXmax);

    let createrBarYmax = {
      dom: this.$refs.createrBarYmax,
      type: 'y',
      seriesName: ['洋湖1号', '洋湖2号', '洋湖3号'],
      tooltip: {
        trigger: 'axis',
        formatter: function (val) {
          return `${val[0].name}<br/>
                    <span style="color:#FFBB00;">   ● </span>${val[0].seriesName}: ${val[0].value}<br/>
                    <span style="color:#FC1E53;">   ● </span>${val[1].seriesName}: ${val[1].value}<br/>
                    <span style="color:#8BDC85;">   ● </span>${val[1].seriesName}: ${val[2].value}`
        }
      },
      series: [{
        name: '在线',
        barWidth: 5,
        data: [{
          value: 759,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }, {
          value: 559,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }, {
          value: 259,
          itemStyle: {
            normal: {
              color: '#FFBB00'
            }
          }
        }]
      }, {
        name: '隐患',
        barWidth: 5,
        data: [{
          value: 265,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }, {
          value: 459,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }, {
          value: 365,
          itemStyle: {
            normal: {
              color: '#FC1E53'
            }
          }
        }]
      }, {
        name: '报警',
        barWidth: 5,
        data: [{
          value: 546,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }, {
          value: 125,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }, {
          value: 999,
          itemStyle: {
            normal: {
              color: '#8BDC85'
            }
          }
        }]
      }]
    };
    this.vEcharts.echarts.createrBar(createrBarYmax);

    let line = {
      dom: this.$refs.line,
      seriesName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [{
        name: '火情',
        data: [12, 13, 10, 13, 9, 23, 21]
      }, {
        name: '警报',
        data: [8, 23, 15, 7, 19, 6, 12]
      }, {
        name: '危险品',
        data: [18, 3, 5, 17, 5, 13, 2]
      }]
    }
    this.vEcharts.echarts.line(line);
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
.v-echart-50 {
  width: 49%;
}
</style>
