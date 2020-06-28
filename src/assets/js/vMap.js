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

// map对象参数
let mapConfig = {
  zoom: 18,
  pitch: 65,
  rotation: 45,
  zooms: [3, 20],
  center: [116.353897, 40.072519]
};

// 单位图层
let buildingLayer = "";

// 公共参数
let markerBackColor = "font-color-level1";
let markerIconColor = "back-color";

/**
 * marker 初始化icon
 * @param {icon图标} icon
 */
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

/**
 * 判断是否是函数
 * @param {*} obj
 */
// function isFunction(obj) {
//   if (Object.prototype.toString.call(obj) === "[object Function]") {
//     return true;
//   }
//   return false;
// }

/**
 * 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
 * DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
 * @param {*} route
 */
function parseRouteToPath(route) {
  var path = [];

  for (var i = 0, l = route.steps.length; i < l; i++) {
    var step = route.steps[i];

    for (var j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j]);
    }
  }
  return path;
}

/**
 * 画路线
 * @param {*} route
 */
function drawRoute(map, route, strokeColor = "#0091ff") {
  var path = parseRouteToPath(route);

  var startMarker = new AMap.Marker({
    position: path[0],
    icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
    map: map
  });

  var endMarker = new AMap.Marker({
    position: path[path.length - 1],
    icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
    map: map
  });

  var routeLine = new AMap.Polyline({
    path: path,
    isOutline: true,
    outlineColor: "#525252",
    borderWeight: 1,
    strokeWeight: 5,
    strokeColor: strokeColor,
    lineJoin: "round"
  });

  routeLine.setMap(map);

  // 调整视野达到最佳显示区域
  map.setFitView([startMarker, endMarker, routeLine]);
  return path;
}

// 全局map函数
let map = {
  // 初始化map地图
  initMap(type) {
    var map = new AMap.Map("map", {
      resizeEnable: true,
      showLabel: false,
      zoom: mapConfig.zoom,
      pitch: mapConfig.pitch,
      rotation: mapConfig.rotation,
      viewMode: "3D", //开启3D视图,默认为关闭
      expandZoomRange: true,
      zooms: mapConfig.zooms,
      center: mapConfig.center,
      mapStyle: "amap://styles/c29a8664d6d2a663dcab6f0c2cae3fc6" //设置地图的显示样式
    });

    // 将地图对象存入vuex
    let thisMap = {};
    thisMap[type] = map;
    store.dispatch("addMaps", thisMap);
    store.commit("map", map);
    return map;
  },

  /**
   * 计算区域中心点
   * @param {区域数组} lnglatarr
   */
  calculateCenter(lnglatarr) {
    console.log(lnglatarr);
    var total = lnglatarr.length;
    let X = 0,
      Y = 0,
      Z = 0;

    lnglatarr.forEach(element => {
      var lng = (element.lng * Math.PI) / 180;
      var lat = (element.lat * Math.PI) / 180;
      var x, y, z;
      x = Math.cos(lat) * Math.cos(lng);
      y = Math.cos(lat) * Math.sin(lng);
      z = Math.sin(lat);
      X += x;
      Y += y;
      Z += z;
    });

    X = X / total;
    Y = Y / total;
    Z = Z / total;

    var Lng = Math.atan2(Y, X);
    var Hyp = Math.sqrt(X * X + Y * Y);
    var Lat = Math.atan2(Z, Hyp);

    return new AMap.LngLat((Lng * 180) / Math.PI, (Lat * 180) / Math.PI);
  },

  /**
    * addMarker
    * @param {*} map 
    * @param {
    *   type: type,
        id: type + "_" + id,
        x: x,
        y: y,
        icon: icon
      } obj
    */
  addMarker(map, obj) {
    var marker = new AMap.Marker({
      position: new AMap.LngLat(obj.x, obj.y),
      // title: "我是一点marker",
      content: initMarkerIcon(obj.icon),
      anchor: "bottom-center",
      // animation: "AMAP_ANIMATION_BOUNCE",
      offset: new AMap.Pixel(0, 0),
      extData: {
        type: obj.type,
        id: obj.id
      }
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
    this.deleteMarker(map, obj.id);

    //将marker添加至map。
    map.add(marker);
    return marker;
  },

  /**
   * deleteMarker 删除单个marker点
   * @param {*} type 点类型
   * @param {*} id 点id
   */
  deleteMarker(map, id) {
    // for循环找到即break，效率高一点
    for (let i = 0; i < map.getAllOverlays().length; i++) {
      if (map.getAllOverlays()[i].getExtData().id == id) {
        map.remove(map.getAllOverlays()[i]);
        break;
      }
    }
  },

  /**
   * deleteMarkerBytype 删除一个类型的全部marker点
   * @param {*} type 删除的点类型
   */
  deleteMarkerBytype(map, type) {
    map.getAllOverlays().forEach(element => {
      if (type == element.getExtData().type) {
        map.remove(element);
      }
    });
  },

  /**
   * deleteMarkerByAll 删除全部marker点
   */
  deleteMarkerByAll(map) {
    map.getAllOverlays("marker").forEach(element => {
      map.remove(element);
    });
  },

  /**
   * hideMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  hideMarker(map, id) {
    // for循环找到即break，效率高一点
    for (let i = 0; i < map.getAllOverlays().length; i++) {
      if (map.getAllOverlays()[i].getExtData().id == id) {
        map.getAllOverlays()[i].hide();
        break;
      }
    }
  },

  /**
   * showMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  showMarker(map, id) {
    // for循环找到即break，效率高一点
    for (let i = 0; i < map.getAllOverlays().length; i++) {
      if (map.getAllOverlays()[i].getExtData().id == id) {
        map.getAllOverlays()[i].show();
        break;
      }
    }
  },

  /**
   * hideMarkerByType 隐藏marker同类
   * @param {*} type 类型
   */
  hideMarkerByType(map, type) {
    map.getAllOverlays().forEach(element => {
      if (type == element.getExtData().type) {
        element.hide();
      }
    });
  },

  /**
   * showMarkerByType 显示marker同类
   * @param {*} type 类型
   */
  showMarkerByType(map, type) {
    map.getAllOverlays().forEach(element => {
      if (type == element.getExtData().type) {
        element.show();
      }
    });
  },

  /**
   * selectMarker 定位单个marker点
   * @param {*} map
   * @param {*} id 查找的id
   * @param {*} obj ={ 若不传obj对象，则默认状态。若自定义，则每一个属性都要赋值，否则会报错
   *         animation: 是否开启动画
   *         position: map是否跟随
   *        }
   */
  selectMarker(map, id, obj = { animation: true, position: true }) {
    for (let i = 0; i < map.getAllOverlays().length; i++) {
      if (map.getAllOverlays()[i].getExtData().id == id) {
        let marker = map.getAllOverlays()[i];
        // 是否开启动画
        if (obj.animation) marker.setAnimation("AMAP_ANIMATION_BOUNCE");
        let pos = marker.getPosition();
        // map是否跟随
        if (obj.position) map.panTo([pos.lng, pos.lat]);
        break;
      }
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
  selectMarkerOtherCancel(map, id, obj = { animation: true, position: true }) {
    map.getAllOverlays().forEach(element => {
      element.setAnimation("AMAP_ANIMATION_NONE");
    });
    this.selectMarker(map, id, obj);
  },

  /**
   * polyEditor 编辑单位函数
   * @param {*} position 初始坐标
   * @returns polyEditor
   * polyEditor：编辑工具obj
   */
  polyEditor(obj) {
    store.state.map.setRotation(0);
    store.state.map.setPitch(0);
    let position = obj.position.split(","),
      lng = parseFloat(position[0]),
      lat = parseFloat(position[1]),
      // 经纬基数
      base = 0.0009,
      newPostion = [
        [lng - base, lat + base],
        [lng - base, lat - base],
        [lng + base, lat - base],
        [lng + base, lat + base]
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
    // 创建多边形编辑工具，并启动编辑。
    var polyEditor = new AMap.PolyEditor(store.state.map, polygon);
    polyEditor.open();
    // 返回矢量图形，及编辑工具obj。
    return polyEditor;
  },

  /**
   * 加载楼块
   * @param {*} areas 楼块对象
   */
  createUnitArea(areas) {
    buildingLayer = new AMap.Buildings({
      zIndex: 130,
      merge: false,
      sort: false,
      zooms: [0, 20]
    });
    let options = {
      // 是否隐藏设定区域外的楼块
      hideWithoutStyle: false,
      // 围栏
      areas: areas
    };
    console.log(options);
    //此配色优先级高于自定义mapStyle
    buildingLayer.setStyle(options);
    store.state.map.setLayers([new AMap.TileLayer(), buildingLayer]);

    // 画范围及标识
    areas.forEach(element => {
      let polygon = new AMap.Polygon({
        path: element.path,
        strokeColor: "#000000",
        strokeWeight: 2,
        strokeOpacity: 0.2,
        fillOpacity: 0.5,
        fillColor: element.color,
        zIndex: 50
      });
      store.state.map.add(polygon);
      var obj = {
        type: element.type,
        id: element.id,
        x: element.center.lng,
        y: element.center.lat,
        icon: "el-icon-star-on"
      };
      this.addMarker(obj);
    });
  },

  /**
   * 路线规划
   * @param {地图对象} map
   * @param {开始坐标} star
   * @param {结束坐标} end
   */
  drivingPolicy(map, opt, callback) {
    var drivingOption = {
      policy: AMap.DrivingPolicy.LEAST_TIME // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
    };
    // 构造路线导航类
    var driving = new AMap.Driving(drivingOption);
    // 根据起终点经纬度规划驾车导航路线
    driving.search(
      new AMap.LngLat(opt.star.lng, opt.star.lat),
      new AMap.LngLat(opt.end.lng, opt.end.lat),
      (status, result) => {
        // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === "complete") {
          if (result.routes && result.routes.length) {
            // 绘制第一条路线，也可以按需求绘制其它几条路线
            callback(drawRoute(map, result.routes[0], opt.color));
          }
        } else {
          console.log("获取驾车数据失败：" + result);
        }
      }
    );
  },

  /**
   * 轨迹
   * @param {map对象} map
   * @param {起点坐标} position
   */
  drivTrajectory(map, position) {
    // 汽车对象
    let marker = new AMap.Marker({
      map: map,
      position: position,
      icon: "https://webapi.amap.com/images/car.png",
      offset: new AMap.Pixel(-26, -13),
      autoRotation: true,
      angle: -90
    });
    // 绘制轨迹
    var passedPolyline = new AMap.Polyline({
      map: map,
      strokeColor: "#AF5", //线颜色
      strokeWeight: 6 //线宽
    });
    // 事件绑定
    marker.on("moving", e => {
      passedPolyline.setPath(e.passedPath);
    });
    return marker;
  }
};

export default {
  markerType,
  mapConfig,
  map
};
