// import router from "../../router";
import AMap from "AMap";
import store from "@/store/index.js";

/**
 * markerType 用于区分maker点类型，以便实现增删改查操作
 * default：默认类型
 * fire：策略圈
 */
let markerType = {
  default: "default",
  fire: "fire"
};

// 公共参数
let markerBackColor = "font-color-level1";
let markerIconColor = "back-color";

// 公共函数
function initMarkerIcon(icon) {
  var con =
    `
  <div class="custom-content-marker">
      <i class="iconfont map-marker-shuidi ` +
    markerBackColor +
    ` icon-shuidi-">
        <i class="` +
    icon +
    ` ` +
    markerIconColor +
    `"></i>
      </i>
  </div>
  `;
  return con;
}

// 全局map函数
let map = {
  // 初始化map地图
  initMap() {
    var map = new AMap.Map("map", {
      resizeEnable: true,
      rotateEnable: false,
      pitchEnable: false,
      showLabel: false,
      zoom: 18,
      pitch: 65,
      rotation: 45,
      viewMode: "3D", //开启3D视图,默认为关闭
      expandZoomRange: true,
      zooms: [3, 20],
      center: [116.353897, 40.072519],
      mapStyle: "amap://styles/c29a8664d6d2a663dcab6f0c2cae3fc6" //设置地图的显示样式
    });
    return map;
  },

  /**
   * addMarker
   * @param {*} obj
   * obj:参数集合
   * 必传字段如下：
   * x：x坐标
   * y：y坐标
   * icon：marker-icon
   *
   * 非必填字段如下
   * backColor：marker的背景颜色，若不传则为默认颜色
   * iconColor：icon颜色，若不传为默认颜色
   */
  addMarker(obj) {
    var marker = new AMap.Marker({
      position: new AMap.LngLat(obj.x, obj.y),
      // title: "我是一点marker",
      content: initMarkerIcon(obj.icon),
      anchor: "bottom-center",
      // animation: "AMAP_ANIMATION_BOUNCE",
      offset: new AMap.Pixel(0, 0)
    });
    marker.on("mouseover", () => {
      marker.setLabel({
        content: "<div class='info'>我现在还很丑，不久的将来我会变凤凰。</div>",
        direction: "top"
      });
    });
    marker.on("mouseout", () => {
      marker.setLabel({
        content: "",
        direction: "top"
      });
    });

    // 添加前先过滤掉重复点，若有重复点则直接删除。
    this.deleteMarker(markerType.default, obj.id);

    // console.log(this.deleteMarker);
    // 当marker生成完毕后，添加进vuex供全局增删改查。
    let thisMarker = {};
    thisMarker[markerType.default + "_" + obj.id] = marker;
    store.dispatch("addMarkers", thisMarker);

    //将marker添加至map。
    store.state.map.add(marker);
    return marker;
  },

  /**
   * deleteMarker
   * @param {*} type 删除的点类型
   * @param {*} id 删除的点id
   */
  deleteMarker(type, id) {
    // 删除地图上的marker
    let marker = store.state.markers[type + "_" + id];
    if (marker) {
      store.state.map.remove(marker);
      // 删除vuex里的marker点记录
      delete store.state.markers[type + "_" + id];
      console.log(store.state.markers);
    }
  },

  /**
   * selectMarker
   * @param {*} type 查找的类型
   * @param {*} id 查找的id
   */
  selectMarker(type, id) {
    // 删除地图上的marker
    let marker = store.state.markers[type + "_" + id];
    console.log(marker);
    if (marker) {
      marker.setAnimation("AMAP_ANIMATION_BOUNCE");
    }
  }
};

export default {
  markerType,
  map
};