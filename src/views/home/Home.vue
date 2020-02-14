<template>
  <div class="home">
    <cardPack />
  </div>
</template>

<script>
import cardPack from "@/components/card/cardCarrier/cardPack.vue";
export default {
  name: "home",
  components: {
    cardPack
  },
  data() {
    return {};
  }
};
</script>
