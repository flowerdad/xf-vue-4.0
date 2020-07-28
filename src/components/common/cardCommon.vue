<template>
  <div class="view-body">
    <cardPack type="left" key="left" class="cardLeft" :class="cardPackZoom ? 'cardLeftZoom' : ''" />
    <cardPack type="right" key="right" class="cardRight" :class="cardPackZoom ? 'cardRightZoom' : ''" />
  </div>
</template>

<script>
import cardPack from "@/components/card/cardCarrier/cardPack.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    cardPack
  },
  computed: {
    ...mapGetters(["cardPackZoom"]),
    cardPackZoom() {
      return this.$store.state.cardPackZoom;
    }
  }
};
</script>
