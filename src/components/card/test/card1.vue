<template>
  <div>
    <cardBlock>
      <div slot="body">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容1 " + o }}
        </div>
      </div>
    </cardBlock>
  </div>
</template>

<script>
import cardBlock from "@/components/card/cardCarrier/cardBlock.vue";
export default {
  components: {
    cardBlock
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
