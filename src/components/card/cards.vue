<template>
  <div class="view-body">
    <!-- <div class="mask z-index-1"></div> -->
    <cardPack type="left" key="left" class="cardLeft" :class="[cardPackLeft ? '' : 'cardLeftZoom' , mask ? 'z-index-2' : 'z-index-0']" />
    <cardPack type="right" key="right" class="cardRight" :class="[cardPackRight ? '' : 'cardRightZoom' , mask ? 'z-index-2' : 'z-index-0']" />
  </div>
</template>

<script>
import cardPack from "@/components/card/common/cardPack.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    cardPack
  },
  data() {
    return {
      mask: false
    };
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

<style lang="scss" scoped>
.view-body {
  width: 100%;
}
.cardLeft {
  position: fixed;
  left: 64px;
  transition: all 0.5s;
}
.cardRight {
  position: fixed;
  right: 64px;
  transition: all 0.5s;
}
.cardLeftZoom {
  left: -320px;
}
.cardRightZoom {
  right: -320px;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
