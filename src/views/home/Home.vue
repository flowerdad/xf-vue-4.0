<template>
  <div class="home">
    <slider />
    <indexNav />
    <card1 />
  </div>
</template>

<script>
import slider from "@/components/slider/slider.vue";
import indexNav from "@/components/navMenu/indexNav";
import card1 from "@/components/card/card1";
export default {
  name: "home",
  components: {
    slider,
    indexNav,
    card1
  },
  data() {
    return {};
  }
};
</script>
