<template>
  <div>
    <cardBlock tittle="测试模块1">
      <div slot="body">
        <div>
          <div class="v-echart" ref="chart"></div>
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
    return {
    };
  },
  watch: {
    moduleKey() {

    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
    this.vEcharts.echarts.scalePie(this.$refs.chart)
  }
};
</script>

<style lang="scss" scoped>
.v-echart {
  width: 100%;
  height: 200px;
}
</style>
