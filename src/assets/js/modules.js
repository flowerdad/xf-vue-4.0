import card1 from "@/components/card/test/card1.vue";
import card2 from "@/components/card/test/card2.vue";
import card3 from "@/components/card/test/card3.vue";
import card4 from "@/components/card/test/card4.vue";

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.component("card1", card1);
  Vue.component("card2", card2);
  Vue.component("card3", card3);
  Vue.component("card4", card4);
}

export default plugin;
