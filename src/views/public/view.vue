<template>
  <cards :key="$route.fullPath" />
</template>

<script>
import cards from "@/components/card/cards.vue";
export default {
  name: "home",
  components: {
    cards
  }
};
</script>
