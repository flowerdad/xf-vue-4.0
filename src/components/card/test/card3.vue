<template>
  <div>
    <cardBlock tittle="测试模块3">
      <div slot="body">
        <p class="font-color size-12">基础marker点</p>
        <el-button style="margin-top:10px" type="primary" @click="addMarker(vMap.markerType.default)" size="mini">marker类型1</el-button>
        <el-button type="primary" @click="addMarker(vMap.markerType.device)" size="mini">marker类型2</el-button>
        <el-button type="danger" @click="delMarkerByAll" size="mini">删除</el-button>

        <div class="font-color size-12">
          <p v-for="marker in markerList" :key="marker.id" class="markerItem">
            marker{{ marker.id }}
            <el-tag size="mini" type="danger" class="tag" @click="delMarker(marker.type, marker.id)">删除</el-tag>
            <el-tag size="mini" type="danger" class="tag" @click="delMarkerByType(marker.type)">删除同类</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="hideMarker(marker.type, marker.id)">隐藏</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="showMarker(marker.type, marker.id)">显示</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="hideMarkerByType(marker.type)">隐藏同类</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="showMarkerByType(marker.type)">显示同类</el-tag>
            <el-tag size="mini" class="tag" @click="selMarker(marker.type, marker.id)">定位</el-tag>
            <el-tag size="mini" class="tag" @click="seltMarkerOtherCancel(marker.type, marker.id)">定位当前其他取消</el-tag>
          </p>
        </div>
        <el-divider></el-divider>
        <p class="font-color size-12">单位编辑</p>
        <el-row :gutter="5" style="margin:10px 0px">
          <el-col :span="9">
            <div class="grid-content bg-purple"></div>
            <el-input v-model="unitAreaObj.position" placeholder="坐标:[lng,lat]" size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-color-picker v-model="unitAreaObj.areaColor" size="mini"></el-color-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="polyEditor(unitAreaObj)" size="mini">绘制</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="endUnitArea()" size="mini">结束</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
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
      markerIndex: 1,
      unitArea: Object,
      unitAreaObj: {
        position: "116.353897,40.072519",
        areaColor: "#409EFF"
      },
      unitAreaPath: []
    };
  },
  methods: {
    addMarker(type) {
      var icon = "el-icon-user-solid";
      if (type == "device") icon = "el-icon-user";
      var obj = {
        type: type,
        id: 0 + this.markerIndex,
        x: 116.353897 + this.markerIndex / 1000,
        y: 40.072519,
        icon: icon
      };
      this.markerList.push(obj);
      this.markerIndex++;
      this.vMap.map.addMarker(obj);
    },
    delMarker(type, id) {
      this.vMap.map.deleteMarker(type, id);
      for (var i = 0; i < this.markerList.length; i++) {
        if (this.markerList[i].id == id) {
          this.markerList.splice(i, 1);
        }
      }
    },
    delMarkerByType(type) {
      this.vMap.map.deleteMarkerBytype(type);
    },
    delMarkerByAll() {
      this.vMap.map.deleteMarkerByAll();
    },
    hideMarker(type, id) {
      this.vMap.map.hideMarker(type, id);
    },
    showMarker(type, id) {
      this.vMap.map.showMarker(type, id);
    },
    hideMarkerByType(type) {
      this.vMap.map.hideMarkerByType(type);
    },
    showMarkerByType(type) {
      this.vMap.map.showMarkerByType(type);
    },
    selMarker(type, id) {
      this.vMap.map.selectMarker(type, id);
    },
    seltMarkerOtherCancel(type, id) {
      this.vMap.map.selectMarkerOtherCancel(type, id);
    },
    polyEditor(obj) {
      this.unitArea = this.vMap.map.polyEditor(obj);
      this.unitArea.on("end", event => {
        event.target.w.path.forEach(element => {
          this.unitAreaPath.push([element.lng, element.lat]);
        });
        let colorScale = this.vTools.tools.gradientColor(
          obj.areaColor,
          "#ffffff",
          10,
          "16"
        );
        let createObj = {
          path: this.unitAreaPath,
          color1: obj.areaColor,
          color2: colorScale[5]
        };
        this.vMap.map.createUnitArea(createObj);
      });
    },
    endUnitArea() {
      this.unitArea.close();
      this.$store.state.map.setRotation(this.vMap.mapConfig.rotation);
      this.$store.state.map.setPitch(this.vMap.mapConfig.pitch);
    }
  }
};
</script>

<style lang="scss" scoped>
.markerItem {
  margin-top: 20px;
  .tag {
    margin-left: 5px;
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
