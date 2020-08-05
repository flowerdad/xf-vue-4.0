<template>
  <cardCommon :key="$route.fullPath" />
</template>

<script>
import cardCommon from "@/components/common/cardCommon.vue";
export default {
  name: "home",
  components: {
    cardCommon
  }
};
</script>
