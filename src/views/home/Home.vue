<template>
  <div class="home">
    <slider />
  </div>
</template>

<script>
import slider from "@/components/slider/slider.vue";

export default {
  name: "home",
  components: {
    slider
  },
  data() {
    return {
      localCount: 15
    };
  }
};
</script>
