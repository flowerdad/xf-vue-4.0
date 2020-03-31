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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    cardBlock
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["map"]),
    map() {
      return this.$store.state.map;
    }
  },
  methods: {
    ...mapActions(["addMarkers"]),
    addMarker() {
      var obj = {
        id: 1,
        x: 116.353897,
        y: 40.072519,
        icon: "el-icon-user-solid"
      };
      let marker = this.vMap.addMarker(obj);
      let mar = {};
      mar[obj.id] = marker;
      this.addMarkers(mar);
      this.map.add(marker);
    },
    delMarker() {
      // this.map.remove(this.marker);
    }
  }
};
</script>
