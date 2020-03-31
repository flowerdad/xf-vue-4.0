<template>
  <div>
    <cardBlock tittle="测试模块3">
      <div slot="body">
        <el-button type="primary" @click="addMarker" size="mini">addMarker</el-button>
        <el-button type="danger" @click="delMarker" size="mini">delMarker</el-button>

        <div class="font-color size-12">
          <p v-for="marker in markerList" :key="marker.id" class="markerItem">marker{{marker.id}}
            <el-tag size="mini" type="danger" class="tag" @click="delMarker(marker.id)">删除</el-tag>
            <el-tag size="mini" class="tag" @click="selMarker(marker.id)">定位</el-tag>
          </p>
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
      markerList: [],
      markerIndex: 1
    };
  },
  methods: {
    addMarker() {
      var obj = {
        id: 0 + this.markerIndex,
        x: 116.353897 + this.markerIndex / 1000,
        y: 40.072519,
        icon: "el-icon-user-solid"
      };
      this.markerList.push(obj);
      this.markerIndex++;
      this.vMap.map.addMarker(obj);
    },
    delMarker(id) {
      this.vMap.map.deleteMarker(this.vMap.markerType.default, id);
      for (var i = 0; i < this.markerList.length; i++) {
        if (this.markerList[i].id == id) {
          this.markerList.splice(i, 1);
        }
      }
    },
    selMarker(id) {
      this.vMap.map.selectMarker(this.vMap.markerType.default, id);
    }
  }
};
</script>

<style lang="scss" scoped>
.markerItem {
  margin-top: 20px;
  .tag {
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>
