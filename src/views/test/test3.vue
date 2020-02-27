<template>
  <div class="view-body">
    <cardPack type="left" class="cardLeft" />
    <cardPack type="right" key="right" class="cardRight" />
  </div>
</template>

<script>
import cardPack from "@/components/card/cardCarrier/cardPack.vue";
export default {
  components: {
    cardPack
  },
  data() {
    return {};
  }
};
</script>
