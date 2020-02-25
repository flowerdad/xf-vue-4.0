<template>
  <div class="home">
    <cardPack type="left" class="cardLeft" />
    <cardPack type="right" key="right" class="cardRight" />
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

<style lang="scss" scoped>
.home {
  width: 100%;
}
.cardLeft {
  position: absolute;
  left: 64px;
}
.cardRight {
  position: absolute;
  right: 64px;
}
</style>
