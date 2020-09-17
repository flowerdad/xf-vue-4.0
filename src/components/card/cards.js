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

// 实时数据类
import realtimeStatistics from "@/components/card/realtime/realtimeStatistics.vue";
import realtimeList from "@/components/card/realtime/realtimeList/realtimeList.vue";

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

  // 警报类
  Vue.component("realtimeStatistics", realtimeStatistics);
  Vue.component("realtimeList", realtimeList);
}


export default { plugin };
