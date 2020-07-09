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
            <el-tag size="mini" type="danger" class="tag" @click="delMarker(marker.id)">删除</el-tag>
            <el-tag size="mini" type="danger" class="tag" @click="delMarkerByType(marker.type)">删除同类</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="hideMarker(marker.id)">隐藏</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="showMarker(marker.id)">显示</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="hideMarkerByType(marker.type)">隐藏同类</el-tag>
            <el-tag size="mini" type="warning" class="tag" @click="showMarkerByType(marker.type)">显示同类</el-tag>
            <el-tag size="mini" class="tag" @click="selMarker(marker.id)">定位</el-tag>
            <el-tag size="mini" class="tag" @click="seltMarkerOtherCancel(marker.id)">定位当前其他取消</el-tag>
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
        <el-button type="primary" @click="getUnit()" size="mini">加载已有单位</el-button>
        <div class="font-color size-12" v-if="unitShow">
          <p v-for="unit in unitList" :key="unit.id" class="markerItem">
            unit{{ unit.id }}
            <el-tag size="mini" class="tag" @click="selMarker(unit.id)">定位</el-tag>
            <el-tag size="mini" class="tag" @click="drivingPolicy(unit)">路线规划</el-tag>
            <el-tag size="mini" class="tag" @click="drivTrajectory(unit)">轨迹</el-tag>
          </p>
        </div>
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
      unitAreaPath: [],
      areas: [],
      unitShow: false,
      unitList: [
        {
          id: 1,
          type: "unit",
          color: "#409EFF",
          color1: "E5409EFF",
          color2: "E579bbff",
          center: {
            Q: 40.073375277695646,
            R: 116.34752349893068,
            lng: 116.347523,
            lat: 40.073375
          },
          path: [
            [116.345049, 40.075559],
            [116.344923, 40.071234],
            [116.350006, 40.071222],
            [116.350116, 40.075486]
          ]
        },
        {
          id: 2,
          type: "unit",
          color: "#40FF43",
          color1: "E540FF43",
          color2: "E579ff7b",
          center: {
            Q: 40.07424752528499,
            R: 116.32706001522553,
            lng: 116.32706,
            lat: 40.074248
          },
          path: [
            [116.32378, 40.0762],
            [116.325753, 40.07146],
            [116.329873, 40.071487],
            [116.328834, 40.077843]
          ]
        },
        {
          id: 3,
          type: "unit",
          color: "#FCFF40",
          color1: "E5FCFF40",
          color2: "E5fcff79",
          center: {
            Q: 40.06383717939862,
            R: 116.3619052985332,
            lng: 116.361905,
            lat: 40.063837
          },
          path: [
            [116.36096, 40.06606],
            [116.357333, 40.065582],
            [116.35869, 40.06238],
            [116.361638, 40.06197],
            [116.364586, 40.060992],
            [116.365331, 40.063908],
            [116.364799, 40.065968]
          ]
        },
        {
          id: 4,
          type: "unit",
          color: "#FF6040",
          color1: "E5FF6040",
          color2: "E5ff8f79",
          center: {
            Q: 40.065787543071025,
            R: 116.33824901385486,
            lng: 116.338249,
            lat: 40.065788
          },
          path: [
            [116.334753, 40.068307],
            [116.334805, 40.065484],
            [116.337277, 40.065348],
            [116.33781, 40.063707],
            [116.34254, 40.06373],
            [116.342309, 40.068149]
          ]
        }
      ]
    };
  },
  computed: {
    map() {
      return this.$store.state.maps["main"];
    }
  },
  methods: {
    addMarker(type) {
      var icon = "el-icon-user-solid";
      if (type == "device") icon = "el-icon-user";
      var obj = {
        type: type,
        id: type + "_" + 0 + this.markerIndex,
        x: 116.353897 + this.markerIndex / 1000,
        y: 40.072519,
        icon: icon
      };
      this.markerList.push(obj);
      this.markerIndex++;
      this.vMap.map.addMarker(this.map, obj);
    },
    delMarker(id) {
      this.vMap.map.deleteMarker(this.map, id);
      for (var i = 0; i < this.markerList.length; i++) {
        if (this.markerList[i].id == id) {
          this.markerList.splice(i, 1);
        }
      }
    },
    delMarkerByType(type) {
      this.vMap.map.deleteMarkerBytype(this.map, type);
    },
    delMarkerByAll() {
      this.vMap.map.deleteMarkerByAll(this.map);
    },
    hideMarker(id) {
      this.vMap.map.hideMarker(this.map, id);
    },
    showMarker(id) {
      this.vMap.map.showMarker(this.map, id);
    },
    hideMarkerByType(type) {
      this.vMap.map.hideMarkerByType(this.map, type);
    },
    showMarkerByType(type) {
      this.vMap.map.showMarkerByType(this.map, type);
    },
    selMarker(id) {
      this.vMap.map.selectMarker(this.map, id);
    },
    seltMarkerOtherCancel(id) {
      this.vMap.map.selectMarkerOtherCancel(this.map, id);
    },
    polyEditor(obj) {
      // unitArea详细信息，请看polyEditor注释。
      this.unitArea = this.vMap.map.polyEditor(this.map, obj);
      this.unitArea.on("end", event => {
        // 组装path
        event.target.w.path.forEach(element => {
          console.log(element.lng);
          this.unitAreaPath.push([element.lng, element.lat]);
        });
        // 组装颜色
        let colorScale = this.vTools.tools.gradientColor(
          obj.areaColor,
          "#ffffff",
          10,
          "16"
        );
        // 组装数据格式
        this.areas.push({
          id: 0,
          type: "unit",
          color: obj.areaColor,
          color1: this.vTools.tools.color16ToOpacity16(obj.areaColor),
          color2: this.vTools.tools.color16ToOpacity16(colorScale[3]),
          center: this.vMap.map.calculateCenter(event.target.w.path),
          path: this.unitAreaPath
        });
        // 画区块
        this.vMap.map.createUnitArea(this.map, this.areas);
      });
    },
    getUnit() {
      this.unitShow = true;
      this.vMap.map.createUnitArea(this.map, this.unitList);
    },
    endUnitArea() {
      this.unitArea.close();
      this.map.setRotation(this.vMap.mapConfig.rotation);
      this.map.setPitch(this.vMap.mapConfig.pitch);
    },
    drivingPolicy(unit) {
      this.vMap.map.drivingPolicy(
        this.map,
        {
          star: unit.center,
          end: {
            lng: 116.347187,
            lat: 40.067107
          },
          color: unit.color
        },
        e => {
          this.unitList.forEach(element => {
            if (unit.id == element.id) {
              element.paths = e;
            }
          });
        }
      );
    },
    drivTrajectory(unit) {
      console.log(this.unitList);
      let trajectory = this.vMap.map.drivTrajectory(this.map, [
        unit.center.lng,
        unit.center.lat
      ]);
      trajectory.moveAlong(unit.paths, 200);
    }
  },
  mounted() {
    console.log(this.map);
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
