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
        position: "112.939363, 28.128974",
        areaColor: "#409EFF"
      },
      unitAreaPath: [],
      areas: [],
      unitShow: false,
      unitList: [
        {
          id: 1,
          type: "unit",
          color: "#FD4E64",
          color1: "E5FD4E64",
          color2: "E5fd8392",
          name: '洋湖壹号',
          tip: '1.7',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.938829,
            lat: 28.128764
          },
          path: [
            [112.937642, 28.129931],
            [112.937815, 28.129255],
            [112.937904, 28.128573],
            [112.937943, 28.127204],
            [112.939775, 28.127142],
            [112.939823, 28.128489],
            [112.939839, 28.129855],
          ]
        },

        {
          id: 2,
          type: "unit",
          color: "#00C6FF",
          color1: "E500C6FF",
          color2: "E54cd7ff",
          name: '福祥家园',
          tip: '3.2',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.940964,
            lat: 28.125732
          },
          path: [
            [112.939895, 28.127107],
            [112.939842, 28.125666],
            [112.939819, 28.124223],
            [112.941755, 28.124162],
            [112.941836, 28.124234],
            [112.94191, 28.124378],
            [112.941942, 28.125325],
            [112.941953, 28.12639],
            [112.941697, 28.126714],
            [112.941579, 28.126892],
            [112.941497, 28.127078]
          ]
        },
        {
          id: 3,
          type: "unit",
          color: "#FFB210",
          color1: "E5FFB210",
          color2: "E5ffc957",
          name: '万科白鹭郡',
          tip: '5.7',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            Q: 40.06383717939862,
            R: 116.3619052985332,
            lng: 112.937349,
            lat: 28.13244
          },
          path: [
            [112.935485, 28.134987],
            [112.935244, 28.135068],
            [112.934989, 28.135106],
            [112.934699, 28.135097],
            [112.934435, 28.135048],
            [112.934183, 28.134965],
            [112.933906, 28.13479],
            [112.93453, 28.13422],
            [112.935147, 28.133656],
            [112.935561, 28.133206],
            [112.935962, 28.132751],
            [112.936322, 28.132594],
            [112.937078, 28.131414],
            [112.937584, 28.130127],
            [112.937733, 28.130031],
            [112.938793, 28.129999],
            [112.939406, 28.129981],
            [112.939622, 28.130159],
            [112.939808, 28.130363],
            [112.939828, 28.131648],
            [112.939335, 28.131752],
            [112.93885, 28.131925],
            [112.938405, 28.132218],
            [112.938067, 28.132588],
            [112.93704, 28.133934],
            [112.936812, 28.134193],
            [112.936566, 28.134408],
            [112.936291, 28.134612],
            [112.935988, 28.134777],
          ]
        },
        {
          id: 4,
          type: "unit",
          color: "#41E280",
          color1: "E541E280",
          color2: "E57aeaa6",
          name: '合能洋湖公馆',
          tip: '4.8',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.941265,
            lat: 28.131021
          },
          path: [
            [112.941897, 28.132122],
            [112.941664, 28.131962],
            [112.941407, 28.131838],
            [112.941117, 28.131747],
            [112.940798, 28.131681],
            [112.940172, 28.131639],
            [112.940143, 28.130547],
            [112.940213, 28.130112],
            [112.940286, 28.130034],
            [112.940392, 28.129971],
            [112.942026, 28.129918],
            [112.942285, 28.130479],
            [112.942423, 28.130865],
            [112.942476, 28.13111],
            [112.942501, 28.131337],
            [112.942503, 28.131868],
            [112.942405, 28.132481]
          ]
        },
        {
          id: 5,
          type: "unit",
          color: "#4069FF",
          color1: "E54069FF",
          color2: "E57996ff",
          name: '博才洋湖小学',
          tip: '6.3',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.942842,
            lat: 28.125003
          },
          path: [
            [112.943695, 28.125456],
            [112.943147, 28.125595],
            [112.942561, 28.125874],
            [112.942328, 28.126048],
            [112.941982, 28.126362],
            [112.941978, 28.125874],
            [112.94197, 28.125076],
            [112.941941, 28.124371],
            [112.942004, 28.124244],
            [112.942087, 28.124158],
            [112.943722, 28.124111],
            [112.944235, 28.125384]
          ]
        },
        {
          id: 6,
          type: "unit",
          color: "#723CDE",
          color1: "E5723CDE",
          color2: "E59c76e7",
          name: '北大资源时光',
          tip: '6.3',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.938368,
            lat: 28.123206
          },
          path: [
            [112.93722, 28.124145],
            [112.937108, 28.123798],
            [112.937048, 28.12331],
            [112.936995, 28.12296],
            [112.936872, 28.122481],
            [112.939603, 28.122206],
            [112.939643, 28.123153],
            [112.939662, 28.1241]
          ]
        },
        {
          id: 7,
          type: "unit",
          color: "#E1A038",
          color1: "E5E1A038",
          color2: "E5eabc73",
          name: '中天栖溪里',
          tip: '8.7',
          style: {
            fillOpacity: 0.5,
          },
          center: {
            lng: 112.94134,
            lat: 28.123092
          },
          path: [
            [112.939987, 28.124093],
            [112.939857, 28.123997],
            [112.93981, 28.12362],
            [112.939768, 28.123107],
            [112.939733, 28.122207],
            [112.942486, 28.122021],
            [112.942665, 28.12249],
            [112.942851, 28.12296],
            [112.943046, 28.123455],
            [112.943196, 28.123969]
          ]
        }
      ],
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
        x: 112.939363 + this.markerIndex / 1000,
        y: 28.128974,
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
        console.log(this.areas)
        // 画区块
        this.vMap.map.createUnitArea(this.map, this.areas);
      });
    },
    getUnit() {
      this.unitShow = true;
      console.log(this.unitList)
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
            lng: 112.938129,
            lat: 28.152182
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
    // console.log(this.map);
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
