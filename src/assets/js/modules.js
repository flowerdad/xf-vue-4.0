import card1 from "@/components/card/test/card1.vue";
import card2 from "@/components/card/test/card2.vue";
import card3 from "@/components/card/test/card3.vue";
import card4 from "@/components/card/test/card4.vue";

import card5 from "@/components/card/test/card5.vue";
import card6 from "@/components/card/test/card6.vue";
import card7 from "@/components/card/test/card7.vue";
import card8 from "@/components/card/test/card8.vue";
import card9 from "@/components/card/test/card9.vue";
import card10 from "@/components/card/test/card10.vue";
import card11 from "@/components/card/test/card11.vue";
import card12 from "@/components/card/test/card12.vue";
import card13 from "@/components/card/test/card13.vue";
import card14 from "@/components/card/test/card14.vue";
import card15 from "@/components/card/test/card15.vue";
import card16 from "@/components/card/test/card16.vue";
import card17 from "@/components/card/test/card17.vue";
import card18 from "@/components/card/test/card18.vue";
function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.component("card1", card1);
  Vue.component("card2", card2);
  Vue.component("card3", card3);
  Vue.component("card4", card4);
  Vue.component("card5", card5);
  Vue.component("card6", card6);
  Vue.component("card7", card7);
  Vue.component("card8", card8);
  Vue.component("card9", card9);
  Vue.component("card10", card10);
  Vue.component("card11", card11);
  Vue.component("card12", card12);
  Vue.component("card13", card13);
  Vue.component("card14", card14);
  Vue.component("card15", card15);
  Vue.component("card16", card16);
  Vue.component("card17", card17);
  Vue.component("card18", card18);
}

let modules = [
  {
    id: "1",
    type: "类型1",
    module: [
      {
        id: 1,
        icon: "el-icon-eleme",
        type: "card1",
        title: "测试模块1",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 2,
        icon: "el-icon-eleme",
        type: "card2",
        title: "测试模块2",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 3,
        icon: "el-icon-eleme",
        type: "card3",
        title: "测试模块3",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 4,
        icon: "el-icon-eleme",
        type: "card4",
        title: "测试模块4",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      }
    ]
  },
  {
    id: "2",
    type: "类型2",
    module: [
      {
        id: 5,
        icon: "el-icon-eleme",
        type: "card5",
        title: "测试模块5",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 6,
        icon: "el-icon-eleme",
        type: "card6",
        title: "测试模块6",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 7,
        icon: "el-icon-eleme",
        type: "card7",
        title: "测试模块7",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 8,
        icon: "el-icon-eleme",
        type: "card8",
        title: "测试模块8",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 9,
        icon: "el-icon-eleme",
        type: "card9",
        title: "测试模块9",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      }
    ]
  },
  {
    id: "3",
    type: "类型3",
    module: [
      {
        id: 10,
        icon: "el-icon-eleme",
        type: "card10",
        title: "测试模块10",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 11,
        icon: "el-icon-eleme",
        type: "card11",
        title: "测试模块11",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 12,
        icon: "el-icon-eleme",
        type: "card12",
        title: "测试模块12",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 13,
        icon: "el-icon-eleme",
        type: "card13",
        title: "测试模块13",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 14,
        icon: "el-icon-eleme",
        type: "card14",
        title: "测试模块14",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 15,
        icon: "el-icon-eleme",
        type: "card15",
        title: "测试模块15",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 16,
        icon: "el-icon-eleme",
        type: "card16",
        title: "测试模块16",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 17,
        icon: "el-icon-eleme",
        type: "card17",
        title: "测试模块17",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      },
      {
        id: 18,
        icon: "el-icon-eleme",
        type: "card18",
        title: "测试模块18",
        describe: "我是一个优秀的模块，哦也，奥利给。"
      }
    ]
  }
];

export default { plugin, modules };
