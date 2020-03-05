<template>
  <div>
    <cardBlock tittle="测试模块3">
      <div slot="body">
        <!-- <div v-for="o in 5" :key="o" class="font-color size-12">
          {{ "列表内容3 " + o }}
        </div> -->
        <el-button type="primary" @click="addMarker">addMarker</el-button>
        <el-button type="danger" @click="delMarker">delMarker</el-button>
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
  methods: {
    addMarker() {
      alert(1);
    },
    delMarker() {
      alert(2);
    }
  }
};
</script>
