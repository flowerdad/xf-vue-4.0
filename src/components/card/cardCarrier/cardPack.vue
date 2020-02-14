<template>
  <div class="cardPack">
    <card1 v-if="jurisdiction.cardIsDisplayed(type, 'card1')"></card1>
    <card2 v-if="jurisdiction.cardIsDisplayed(type, 'card2')"></card2>
    <card3 v-if="jurisdiction.cardIsDisplayed(type, 'card3')"></card3>
    <card4 v-if="jurisdiction.cardIsDisplayed(type, 'card4')"></card4>
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
  props: {
    type: String
  },
  methods: {},
  mounted() {
    console.log(this.jurisdiction.cardIsDisplayed(this.type, "card1"));
  }
};
</script>

<style scoped>
.cardPack {
  /* padding: 10px 0px; */
  width: 320px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
}
</style>
