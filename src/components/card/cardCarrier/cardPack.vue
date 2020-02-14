<template>
  <div class="cardPack">
    <card1></card1>
    <card2></card2>
    <card3></card3>
    <card4></card4>
  </div>
</template>

<script>
import card1 from "@/components/card/test/card1.vue";
import card2 from "@/components/card/test/card2.vue";
import card3 from "@/components/card/test/card3.vue";
import card4 from "@/components/card/test/card4.vue";
export default {
  components: {
    card1,
    card2,
    card3,
    card4
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.cardPack {
  padding: 10px 0px;
  width: 320px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
