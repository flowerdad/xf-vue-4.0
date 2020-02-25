<template>
  <div>
    <cardBlock tittle="测试模块1">
      <div slot="body">
        <themePicker />
        <p class="test-p">12312312312312</p>
        1231231
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
