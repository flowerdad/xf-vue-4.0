
import $echarts from 'echarts';

// 默认颜色组
let colors = ['#FFBB00', '#FC1E53', '#8BDC85', '#00C6FF', '#FB7C32', '#7C838A']

/**
 * 参数格式化
 * @param {data} data 
 * @param {['param',...]} param 
 * @param {default} value 
 */
function formatParam(data, param, value) {
  let arr = [data[param[0]]];
  if (arr[0] == undefined) {
    return value
  }
  let isParam = true;
  for (let i = 0; i < param.length - 1; i++) {
    let e = arr[i][param[i + 1]];
    if (e == undefined) {
      isParam = false;
      break;
    }
    arr.push(e);
  }
  isParam ? value = arr[arr.length - 1] : ''
  return value;
}



let echarts = {
  /**
   * singlePie 单项饼图
   * @param {
   *  解释：凡参数前不带 '//' 的都是必传字段,反之非必传，
   *  dom: dom对象
   *  // backgroundColor: 背景颜色 --- 默认透明
   *  title: {
   *    text: 主标题名称
   *    textStyle: { 主标题样式
   *    // color: 颜色 --- 默认#FFBB00
   *    // fontSize: 字体大小 --- 默认13(自然正整数)
   *    },
   *    subtext: 副标题名称
   *    subtextStyle: { 副标题名称
   *    // color: 颜色 --- 默认#AAB7BF
   *    // fontSize: 字体大小 --- 默认12(自然正整数)
   *    },
   *    // itemGap: 标题间距 --- 自然正整数
   *    // top: 距离顶端距离,当正副标题不在中间时,调整该字段居中 --- 百分比
   *  },
   *  angleAxis: {
   *  // max: 饼图基数 --- 默认100
   *  },
   *  tooltip: {
   *  // formatter: tip显示规则 --- 默认'{c}%'
   *  },
   *  polar: {
   *  // radius: 线圈宽度 --- 默认['68%', '100%']
   *  },
   *  series: {
   *    // backgroundStyle: 线圈背景色 --- 默认#333846
   *    value: 50, 线圈value
   *    // color: '#00ff00' 线圈颜色 --- 默认#FFBB00
   *  }
   * } data 
   * 
   * 若不改变任何样式，基础参数即可实现
   * @param {
      dom: this.$refs.chart,
      title: {
        text: '50.2%',
        subtext: '风险',
      },
      series: {
        value: 50,
      }
    } data
  */
  singlePie(data) {
    let option = {
      backgroundColor: formatParam(data, ['backgroundColor'], ''),
      title: {
        text: formatParam(data, ['title', 'text'], '50.5%'),
        textStyle: {
          color: formatParam(data, ['title', 'textStyle', 'color'], '#FFBB00'),
          fontSize: formatParam(data, ['title', 'textStyle', 'fontSize'], 13)
        },
        subtext: formatParam(data, ['title', 'subtext'], '单项饼图'),
        subtextStyle: {
          color: formatParam(data, ['title', 'subtextStyle', 'color'], '#AAB7BF'),
          fontSize: formatParam(data, ['title', 'subtextStyle', 'fontSize'], 12)
        },
        itemGap: formatParam(data, ['title', 'itemGap'], 3),
        left: 'center',
        top: formatParam(data, ['title', 'top'], '31.5%')
      },
      angleAxis: {
        max: formatParam(data, ['angleAxis', 'max'], 100),
        show: false,
      },
      tooltip: {
        trigger: 'item',
        formatter: formatParam(data, ['tooltip', 'formatter'], null)
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
      },
      polar: {
        radius: formatParam(data, ['polar', 'radius'], ['68%', '100%']),
        center: ['50%', '50%'],
      },
      series: [{
        type: 'bar',
        roundCap: true,
        showBackground: true,
        coordinateSystem: 'polar',
        backgroundStyle: {
          color: formatParam(data, ['series', 'backgroundStyle'], "#333846")
        },
        data: [{
          value: formatParam(data, ['series', 'value'], 30),
          itemStyle: {
            color: formatParam(data, ['series', 'color'], '#FFBB00')
          },
        }],
      }],
    };
    let chart = $echarts.init(data.dom);
    chart.setOption(option);
  },

  /**
   * multinomialPie 单项饼图
   * @param {
   *  解释：凡参数前不带 '//' 的都是必传字段,反之非必传，
   *  dom: dom对象
   *  // backgroundColor: 背景颜色 --- 默认透明
   *  title: {
   *    text: 主标题名称
   *    textStyle: { 主标题样式
   *    // color: 颜色 --- 默认#FFBB00
   *    // fontSize: 字体大小 --- 默认13(自然正整数)
   *    }
   *  },
   *  angleAxis: {
   *  // max: 饼图基数 --- 默认100
   *  },
   *  tooltip: {
   *  // formatter: tip显示规则 --- 默认'{c}%'
   *  },
   *  polar: {
   *  // radius: 线圈宽度 --- 默认['68%', '100%']
   *  },
   *  series: {
   *    backgroundStyle: 线圈背景色 --- 默认#333846
   *    data: [{
   *      value: 线圈value
   *      color: '#00ff00' 线圈颜色
   *    },
   *    ...
   *    ]
   *  }
   * } data 
   * 
   * 若不改变任何样式，基础参数即可实现
   * @param {
      dom: this.$refs.chart,
      title: {
        text: '50.2%',
      },
      series: {
        backgroundStyle: '#333846',
        data: [{
          value: 30,
          color: '#FFBB00'
        }, {
          value: 60,
          color: '#F56C6C'
        }, {
          value: 80,
          color: '#006C6C'
        }]
      }
    } data
  */
  multinomialPie(data) {
    let option = {
      backgroundColor: formatParam(data, ['backgroundColor'], ''),
      title: {
        text: formatParam(data, ['title', 'text'], '多项饼图'),
        textStyle: {
          color: formatParam(data, ['title', 'textStyle', 'color'], '#FFBB00'),
          fontSize: formatParam(data, ['title', 'textStyle', 'fontSize'], 13),
        },
        left: 'center',
        top: 'center'
      },
      angleAxis: {
        max: formatParam(data, ['angleAxis', 'max'], 100),
        show: false,
      },
      tooltip: {
        trigger: 'item',
        formatter: formatParam(data, ['tooltip', 'formatter'], null)
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
      },
      polar: {
        radius: formatParam(data, ['polar', 'radius'], ['68%', '100%']),
        center: ['50%', '50%'],
      },
      series: [{ // 灰色环
        type: 'bar',
        showBackground: true,
        coordinateSystem: 'polar',
        roundCap: true,
        z: 0,
        backgroundStyle: {
          color: formatParam(data, ['series', 'backgroundStyle'], '#333846')
        },
        data: [{
          value: 0
        }]
      }],
    };
    let index = data.series.data.length;
    data.series.data.forEach(element => {
      let item = {
        type: 'bar',
        roundCap: true,
        coordinateSystem: 'polar',
        barGap: '-100%', // 两环重叠
        z: index,
        data: [{
          value: element.value,
          itemStyle: {
            color: element.color,
          },
        }],
      }
      option.series.push(item)
      index--;
    });

    let chart = $echarts.init(data.dom);
    chart.setOption(option);
  },

  /**
   * 开发时基础柱状图，暂无用，留着做对比。
   * @param {} data 
   */
  portraitBar(data) {
    let xAxisData = [];
    let seriesData = [];
    data.series.data.forEach(element => {
      xAxisData.push(element.name)
      seriesData.push({
        value: element.value ? element.value : 0,
        itemStyle: {
          normal: {
            color: element.color ? element.color : colors[Math.floor(Math.random() * 5)]
          }
        }
      })
    });
    let option = {
      grid: {
        top: formatParam(data, ['grid', 'top'], 0),
        left: formatParam(data, ['grid', 'left'], 0),
        bottom: formatParam(data, ['grid', 'bottom'], 20),
        right: formatParam(data, ['grid', 'right'], 0),
        containLabel: formatParam(data, ['grid', 'containLabel'], false)
      },
      tooltip: {
        trigger: 'item',
        formatter: formatParam(data, ['tooltip', 'formatter'], null)
      },
      xAxis: [{
        type: "category",
        data: xAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: formatParam(data, ['xAxis', 'axisLabel', 'textStyle', 'color'], "#999999"),
            fontSize: formatParam(data, ['xAxis', 'axisLabel', 'textStyle', 'fontSize'], 12)
          },
        }
      }],
      yAxis: {
        max: formatParam(data, ['yAxis', 'max'], null),
        show: false,
      },
      series: [{
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: formatParam(data, ['series', 'itemStyle', 'barBorderRadius'], 100),
          }
        },
        showBackground: formatParam(data, ['series', 'showBackground'], true),
        backgroundStyle: {
          color: formatParam(data, ['series', 'backgroundStyle', 'color'], '#333846'),
          barBorderRadius: formatParam(data, ['series', 'backgroundStyle', 'barBorderRadius'], 100)
        },
        barWidth: formatParam(data, ['series', 'barWidth'], 15),
        data: seriesData
      }]
    };
    let chart = $echarts.init(data.dom);
    chart.setOption(option);
  },

  /**
   * createrBar 柱状图
   * @param {
   * 解释：凡参数前不带 '//' 的都是必传字段,反之非必传，
    dom: this.$refs.transverseBar,
    type: 'x', 柱状图横纵向，x纵向，y横向，默认x
    seriesName: [], 名称
    grid: { 间距调整
      // top: 0,
      // left: 0,
      // bottom: 20,
      // right: 0,
      // containLabel: false 自适应布局，防止内容溢出 --- 默认false
    },
    tooltip: {
      // formatter: '{c} 个' tip显示规则 --- 默认'{c}%'
    },
    axis: {
      max: null 最大数值 默认null，若不传值，则最大的某项数据立柱将触顶
      axisLabel: {
        textStyle: {
          // color: "#ff0000", x轴字体颜色 
          // fontSize: 12 x轴字体大小
        },
      }
    },
    series: [{
      name: '报警', 立柱name
      itemStyle: {
        // barBorderRadius: 100, 立柱圆角
      },
      // showBackground: true, 是否填充背景色
      backgroundStyle: { 
        // color: '#333846', 立柱背景颜色
        // barBorderRadius: 100 立柱背景圆角
      },
      // barWidth: 20, 立柱宽度
      data: [{ 
        value: 20, 立柱value
        itemStyle: {
          normal: {
            color: '#8BDC85' 立柱颜色，若不传则随机颜色组颜色
          }
        } 
      },
      ...
      ]
    },
    ...
    ]
  } data 
  *
  * 若不改变任何样式，基础参数即可实现
  * @param {
    dom: this.$refs.createrBarX,
    seriesName: ['洋湖1号', '洋湖2号', '洋湖3号'],
    series: [{
      data: [{
        value: 759
      }, {
        value: 559
      }, {
        value: 259
      }]
    }]
   } data
  */
  createrBar(data) {
    // 组装series
    let series = [];
    data.series.forEach(e => {
      let eDatas = []
      e.data.forEach(eData => {
        eDatas.push({
          value: formatParam(eData, ['value'], '-'),
          itemStyle: {
            normal: {
              color: formatParam(eData, ['itemStyle', 'normal', 'color'], colors[Math.floor(Math.random() * 5)])
            }
          }
        })
      });

      series.push({
        name: formatParam(e, ['name'], '-'),
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: formatParam(e, ['itemStyle', 'barBorderRadius'], 100),
          }
        },
        showBackground: formatParam(e, ['showBackground'], true),
        backgroundStyle: {
          color: formatParam(e, ['backgroundStyle', 'color'], '#333846'),
          barBorderRadius: formatParam(e, ['backgroundStyle', 'barBorderRadius'], 100)
        },
        barWidth: formatParam(e, ['barWidth'], 15),
        data: eDatas
      })
    });

    // 组装xAxis,yAxis
    let type = formatParam(data, ['type'], 'x');
    let xAxis = null, yAxis = null;
    let gridBottom = 20;
    let gridContainLabel = false
    // 样式1
    let style1 = [{
      type: "category",
      data: formatParam(data, ['seriesName'], []),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: formatParam(data, ['axis', 'axisLabel', 'textStyle', 'color'], "#999999"),
          fontSize: formatParam(data, ['axis', 'axisLabel', 'textStyle', 'fontSize'], 12)
        },
      },
      axisPointer: {
        z: 1,
        lineStyle: {
          width: 2,
          color: '#333846'
        }
      }
    }]
    // 样式2
    let style2 = {
      max: formatParam(data, ['axis', 'max'], null),
      show: false,
    }
    // 状态处理
    if (type != 'y') {
      xAxis = style1;
      yAxis = style2;
    } else {
      xAxis = style2;
      yAxis = style1;
      gridBottom = -20;
      gridContainLabel = true;
    }

    let option = {
      backgroundColor: formatParam(data, ['backgroundColor'], ''),
      grid: {
        top: formatParam(data, ['grid', 'top'], 0),
        left: formatParam(data, ['grid', 'left'], 0),
        bottom: formatParam(data, ['grid', 'bottom'], gridBottom),
        right: formatParam(data, ['grid', 'right'], 0),
        containLabel: formatParam(data, ['grid', 'containLabel'], gridContainLabel)
      },
      tooltip: {
        trigger: formatParam(data, ['tooltip', 'trigger'], 'item'),
        formatter: formatParam(data, ['tooltip', 'formatter'], null)
      },
      xAxis: xAxis,
      yAxis: yAxis,
      series: series
    };

    let chart = $echarts.init(data.dom);
    chart.setOption(option);
  },

  /**
   * createrLine 折线图
   * @param {*} data 参数太多,不想努力了,参考上面的注释，自行脑补。
   * *
  * 若不改变任何样式，基础参数即可实现
  * @param {
      dom: this.$refs.createrLine,
      seriesName: ['周一', '周二', '周三', '周四', '周五', '周六', '日'],
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
    } data
   */
  createrLine(data) {
    // 组装series
    let series = [];
    data.series.forEach(e => {
      series.push({
        name: formatParam(e, ['name'], '-'),
        type: 'line',
        smooth: true,
        symbolSize: formatParam(e, ['symbolSize'], 1),
        symbol: 'circle',
        showSymbol: false,
        data: formatParam(e, ['data'], []),
        lineStyle: {
          width: formatParam(e, ['lineStyle', 'width'], 2),
          color: formatParam(e, ['lineStyle', 'color'], colors[Math.floor(Math.random() * 5)]),
        },
      })
    })

    let option = {
      backgroundColor: formatParam(data, ['backgroundColor'], ''),
      tooltip: {
        trigger: formatParam(data, ['tooltip', 'trigger'], 'axis'),
        formatter: formatParam(data, ['tooltip', 'formatter'], null)
      },
      grid: {
        top: formatParam(data, ['grid', 'top'], 10),
        left: formatParam(data, ['grid', 'left'], 0),
        bottom: formatParam(data, ['grid', 'bottom'], 0),
        right: formatParam(data, ['grid', 'right'], 10),
        containLabel: formatParam(data, ['grid', 'containLabel'], true)
      },
      xAxis: [{
        type: 'category',
        boundaryGap: formatParam(data, ['xAxis', 'boundaryGap'], false),
        data: formatParam(data, ['seriesName'], []),
        axisTick: {
          inside: formatParam(data, ['xAxis', 'axisTick', 'inside'], true),
          lineStyle: {
            width: formatParam(data, ['xAxis', 'axisTick', 'lineStyle', 'width'], 2)
          }
        },
        axisLine: {
          lineStyle: {
            width: formatParam(data, ['xAxis', 'axisLine', 'lineStyle', 'width'], 2),
            color: formatParam(data, ['xAxis', 'axisLine', 'lineStyle', 'color'], '#333846')
          }
        },
        axisLabel: {
          textStyle: {
            color: formatParam(data, ['xAxis', 'axisLabel', 'textStyle', 'color'], '#7C838A')
          },
          fontSize: formatParam(data, ['xAxis', 'axisLabel', 'fontSize'], 12),
        },
        axisPointer: {
          z: formatParam(data, ['xAxis', 'axisPointer', 'z'], 1),
          lineStyle: {
            width: formatParam(data, ['xAxis', 'axisPointer', 'lineStyle', 'width'], 2),
            color: formatParam(data, ['xAxis', 'axisPointer', 'lineStyle', 'color'], '#333846')
          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          inside: formatParam(data, ['yAxis', 'axisTick', 'inside'], true),
          lineStyle: {
            width: formatParam(data, ['yAxis', 'axisTick', 'lineStyle', 'width'], 2)
          }
        },
        axisLine: {
          lineStyle: {
            width: formatParam(data, ['yAxis', 'axisLine', 'lineStyle', 'width'], 2),
            color: formatParam(data, ['yAxis', 'axisLine', 'lineStyle', 'color'], '#333846')
          }
        },
        axisLabel: {
          textStyle: {
            color: formatParam(data, ['yAxis', 'axisLabel', 'textStyle', 'color'], '#7C838A')
          },
          fontSize: formatParam(data, ['yAxis', 'axisLabel', 'fontSize'], 12),
        },
        splitLine: {
          show: formatParam(data, ['yAxis', 'splitLine', 'show'], false),
        }
      }],
      series: series
    };

    let chart = $echarts.init(data.dom);
    chart.setOption(option);
  }
};

export default {
  echarts
};
