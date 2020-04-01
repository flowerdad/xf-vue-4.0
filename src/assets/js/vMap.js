// import router from "../../router";
import AMap from "AMap";
import store from "@/store/index.js";

/**
 * markerType 用于区分maker点类型，以便实现增删改查操作
 * default：默认类型
 * device:设备
 */
let markerType = {
  default: "default",
  device: "device"
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

// 判断是否是函数
// function isFunction(obj) {
//   if (Object.prototype.toString.call(obj) === "[object Function]") {
//     return true;
//   }
//   return false;
// }

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
   * addMarker 添加marker点
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
    this.deleteMarker(obj.type, obj.id);

    // 当marker生成完毕后，添加进vuex供全局增删改查。
    let thisMarker = {};
    thisMarker[obj.type + "_" + obj.id] = marker;
    store.dispatch("addMarkers", thisMarker);

    //将marker添加至map。
    store.state.map.add(marker);
    return marker;
  },

  /**
   * deleteMarker 删除单个marker点
   * @param {*} type 点类型
   * @param {*} id 点id
   */
  deleteMarker(type, id) {
    // vuex里拿到marker
    let marker = store.state.markers[type + "_" + id];
    if (marker) {
      // 删除地图上的marker
      store.state.map.remove(marker);
      // 删除vuex里的marker点记录
      delete store.state.markers[type + "_" + id];
      console.log(store.state.markers);
    }
  },

  /**
   * deleteMarkerBytype 删除一个类型的全部marker点
   * @param {*} type 删除的点类型
   */
  deleteMarkerBytype(type) {
    for (let key in store.state.markers) {
      var markerKey = key.split("_");
      console.log(markerKey);
      if (type == markerKey[0]) {
        this.deleteMarker(markerKey[0], markerKey[1]);
      }
    }
  },

  /**
   * deleteMarkerByAll 删除全部marker点
   */
  deleteMarkerByAll() {
    for (let key in store.state.markers) {
      var markerKey = key.split("_");
      this.deleteMarker(markerKey[0], markerKey[1]);
    }
  },

  /**
   * hideMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  hideMarker(type, id) {
    // vuex里拿到marker
    let marker = store.state.markers[type + "_" + id];
    if (marker) {
      marker.hide();
    }
  },

  /**
   * showMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  showMarker(type, id) {
    // vuex里拿到marker
    let marker = store.state.markers[type + "_" + id];
    if (marker) {
      marker.show();
    }
  },

  /**
   * hideMarkerByType 隐藏marker同类
   * @param {*} type 类型
   */
  hideMarkerByType(type) {
    for (let key in store.state.markers) {
      var markerKey = key.split("_");
      console.log(markerKey);
      if (type == markerKey[0]) {
        store.state.markers[key].hide();
      }
    }
  },

  /**
   * showMarkerByType 显示marker同类
   * @param {*} type 类型
   */
  showMarkerByType(type) {
    for (let key in store.state.markers) {
      var markerKey = key.split("_");
      console.log(markerKey);
      if (type == markerKey[0]) {
        store.state.markers[key].show();
      }
    }
  },

  /**
   * selectMarker 定位单个marker点
   * @param {*} type 查找的类型
   * @param {*} id 查找的id
   * @param {*} obj ={ 若不传obj对象，则默认状态。若自定义，则每一个属性都要赋值，否则会报错
   *         animation: 是否开启动画
   *         position: map是否跟随
   *        }
   */
  selectMarker(type, id, obj = { animation: true, position: true }) {
    // vuex里拿到marker
    let marker = store.state.markers[type + "_" + id];
    if (marker) {
      // 是否开启动画
      if (obj.animation) marker.setAnimation("AMAP_ANIMATION_BOUNCE");
      let pos = marker.getPosition();
      // map是否跟随
      if (obj.position) store.state.map.panTo([pos.lng, pos.lat]);
    }
  },

  /**
   * selectMarkerOtherCancel 定位当前marker点，其他marker取消定位
   * @param {*} type 查找的类型
   * @param {*} id 查找的id
   * @param {*} obj ={ 若不传obj对象，则默认状态。若自定义，则每一个属性都要赋值，否则会报错
   *         animation: 是否开启动画
   *         position: map是否跟随
   *        }
   */
  selectMarkerOtherCancel(type, id, obj = { animation: true, position: true }) {
    for (let key in store.state.markers) {
      store.state.markers[key].setAnimation("AMAP_ANIMATION_NONE");
    }
    this.selectMarker(type, id, obj);
  },

  /**
   * createUnitArea编辑单位区块
   * @param {*} position
   */
  createUnitArea(position) {
    let lng = position[0],
      lat = position[1],
      base = 0.0009,
      newPostion = [
        [
          [lng - base, lat + base],
          [lng - base, lat - base],
          [lng + base, lat - base],
          [lng + base, lat + base]
        ]
      ],
      polygon = new AMap.Polygon({
        path: newPostion,
        strokeColor: "#000000",
        strokeWeight: 2,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: "#000000",
        zIndex: 50
      });
    store.state.map.add(polygon);
    // 缩放地图到合适的视野级别
    store.state.map.setFitView([polygon]);

    var polyEditor = new AMap.PolyEditor(store.state.map, polygon);
    return polyEditor;
  }
};

export default {
  markerType,
  map
};
