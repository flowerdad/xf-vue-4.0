<template>
  <div class="view-body">
    <cardPack type="left" key="left" class="cardLeft" :class="cardPackLeft ? 'cardLeftZoom' : ''" />
    <cardPack type="right" key="right" class="cardRight" :class="cardPackRight ? 'cardRightZoom' : ''" />
  </div>
</template>

<script>
import cardPack from "@/components/card/common/cardPack.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    cardPack
  },
  computed: {
    ...mapGetters(["cardPackLeft", "cardPackRight"]),
    cardPackLeft() {
      return this.$store.state.notice.cardPackLeft;
    },
    cardPackRight() {
      return this.$store.state.notice.cardPackRight;
    }
  }
};
</script>
