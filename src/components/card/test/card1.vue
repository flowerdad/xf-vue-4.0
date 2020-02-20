<template>
  <div>
    <cardBlock>
      <div slot="body">
        <themePicker />
      </div>
    </cardBlock>
  </div>
</template>

<script>
import cardBlock from "@/components/card/cardCarrier/cardBlock.vue";
import themePicker from "@/components/settings/themePicker.vue";
export default {
  components: {
    cardBlock,
    themePicker
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
