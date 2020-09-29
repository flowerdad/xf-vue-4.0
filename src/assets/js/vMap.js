// import router from "../../router";
import AMap from "AMap";
import store from "@/store/index.js";

/**
 * markerType 用于区分maker点类型，以便实现增删改查操作
 * default：默认类型
 * device:设备
 */
let markerType = {
  unit: {
    type: 'unit',
    zIndex: 10,
    animation: 'AMAP_ANIMATION_BOUNCE'
  },
  fire: {
    type: 'fire',
    back: 'danger-color-100',
    color: 'blacks-color-100',
    size: 'width-24 height-24 size-24',
    zIndex: 1,
    animation: 'AMAP_ANIMATION_SCALE'
  },
  alarm: {
    type: 'alarm',
    back: 'primary-color-100',
    color: 'blacks-color-100',
    size: 'width-30 height-30 size-30',
    zIndex: 2,
    animation: 'AMAP_ANIMATION_BOUNCE'
  },
  device: {
    type: 'device',
    back: 'warning-color-100',
    color: 'whites-color-75',
    size: 'width-40 height-40 size-40',
    zIndex: 3,
    animation: 'AMAP_ANIMATION_SCALE'
  },
  danger: {
    type: 'danger',
    back: 'success-color-100',
    color: 'whites-color-100',
    size: 'width-50 height-50 size-50',
    zIndex: 4,
    animation: 'AMAP_ANIMATION_BOUNCE'
  },
};

// map对象参数
let mapConfig = {
  zoom: 17,
  pitch: 65,
  rotation: 45,
  zooms: [3, 20],
  center: [112.939363, 28.128974]
};

// marker统一样式
function initMarkerDom(obj, id) {
  let back = markerType[obj.type].back
  let color = markerType[obj.type].color
  let size = markerType[obj.type].size
  let dom = `<div class="custom-marker-box custom-marker ` + size + `" id="` + id + `">
      <i class="iconfont iconTag_Bubble_Bg ` + back + ` icon-shuidi-">
       <i class="` + obj.icon + ` ` + color + `"></i>
      </i>
    </div>`;
  return dom;
}

// marker统一样式
function initUnitMarkerDom(obj, id) {
  let dom = `
      <div class="custom-marker-box unit-marker" id="` + id + `">
        <span class="content-marker-name">`+ obj.name + `</span>
        <span class="content-marker-tips" style="background: `+ obj.tipBase + `">` + obj.tip + `</span>
        <span class="content-marker-line"></span>
      </div>
    `
  return dom;
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
// function parseRouteToPath(route) {
//   let path = [];

//   for (let i = 0, l = route.steps.length; i < l; i++) {
//     let step = route.steps[i];

//     for (let j = 0, n = step.path.length; j < n; j++) {
//       path.push(step.path[j]);
//     }
//   }
//   return path;
// }

/**
 * 画路线
 * @param {*} route
 */
// function drawRoute(map, route, strokeColor = "#0091ff") {
//   let path = parseRouteToPath(route);
//   console.log(path)
//   let startMarker = new AMap.Marker({
//     position: path[0],
//     icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
//     map: map
//   });

//   let endMarker = new AMap.Marker({
//     position: path[path.length - 1],
//     icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
//     map: map
//   });

//   let routeLine = new AMap.Polyline({
//     path: path,
//     isOutline: true,
//     outlineColor: "#525252",
//     borderWeight: 1,
//     strokeWeight: 5,
//     strokeColor: strokeColor,
//     lineJoin: "round"
//   });
//   map.add(routeLine)
//   // routeLine.setMap(map);

//   // 调整视野达到最佳显示区域
//   map.setFitView([startMarker, endMarker, routeLine]);
//   return path;
// }

// 全局map函数
let map = {
  // 初始化map地图
  initMap(type) {
    let map = new AMap.Map("map", {
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
    return map;
  },

  /**
   * 计算区域中心点
   * @param {区域数组} lnglatarr
   */
  calculateCenter(lnglatarr) {
    console.log(lnglatarr);
    let total = lnglatarr.length;
    let X = 0,
      Y = 0,
      Z = 0;

    lnglatarr.forEach(element => {
      let lng = (element.lng * Math.PI) / 180;
      let lat = (element.lat * Math.PI) / 180;
      let x, y, z;
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

    let Lng = Math.atan2(Y, X);
    let Hyp = Math.sqrt(X * X + Y * Y);
    let Lat = Math.atan2(Z, Hyp);

    return new AMap.LngLat((Lng * 180) / Math.PI, (Lat * 180) / Math.PI);
  },

  // 组合唯一id
  getType(obj) {
    return obj.type + '_' + obj.id
  },

  getMarkerById(map, id) {
    return map.getAllOverlays().find(t => t.getExtData().id == id)
  },

  getMarkerByType(map, type) {
    let array = []
    map.getAllOverlays().forEach(element => {
      if (element.getExtData().type == type) {
        array.push(element)
      }
    });
    return array;
  },

  /**
    * addMarker
    * @param {*} map 
    * @param {
    *   type: type,
    *   filter:是否去重
        id: type + "_" + id,
        x: x,
        y: y,
        icon: icon
      } obj
    */
  addMarker(map, obj) {
    let id = this.getType(obj);
    // 是否去重
    if (obj.filter) if (this.getMarkerById(map, id) != undefined) return

    let marker = new AMap.Marker({
      position: new AMap.LngLat(obj.x, obj.y),
      // title: "我是一点marker",
      content: initMarkerDom(obj, id),
      anchor: "bottom-center",
      offset: new AMap.Pixel(0, 0),
      zIndex: markerType[obj.type].zIndex,
      topWhenClick: true,
      extData: {
        type: obj.type,
        id: id
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

    //将marker添加至map。
    map.add(marker);
    return marker;
  },

  addUnitMarker(map, obj) {
    let id = this.getType(obj);
    // 是否去重
    if (obj.filter) if (this.getMarkerById(map, id) != undefined) return

    let marker = new AMap.Marker({
      position: new AMap.LngLat(obj.x, obj.y),
      content: initUnitMarkerDom(obj, id),
      anchor: "bottom-center",
      offset: new AMap.Pixel(0, 0),
      zIndex: markerType[obj.type].zIndex,
      topWhenClick: true,
      extData: {
        type: obj.type,
        id: id
      }
    });

    // 将 markers 添加到地图
    map.add(marker);
  },

  /**
   * deleteMarker 删除单个marker点
   * @param {*} type 点类型
   * @param {*} id 点id
   */
  deleteMarker(map, obj) {
    let id = this.getType(obj);
    map.remove(this.getMarkerById(map, id));
  },

  /**
   * deleteMarkerBytype 删除一个类型的全部marker点
   * @param {*} type 删除的点类型
   */
  deleteMarkerBytype(map, type) {
    this.getMarkerByType(map, type).forEach(element => {
      map.remove(element);
    });
  },

  /**
   * hideMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  hideMarker(map, obj) {
    let id = this.getType(obj);
    this.getMarkerById(map, id).hide();
  },

  /**
   * showMarker 隐藏marker
   * @param {*} type 类型
   * @param {*} id id
   */
  showMarker(map, obj) {
    let id = this.getType(obj);
    this.getMarkerById(map, id).show();
  },

  /**
   * hideMarkerByType 隐藏marker同类
   * @param {*} type 类型
   */
  hideMarkerByType(map, type) {
    this.getMarkerByType(map, type).forEach(element => {
      element.hide();
    });
  },

  /**
   * showMarkerByType 显示marker同类
   * @param {*} type 类型
   */
  showMarkerByType(map, type) {
    this.getMarkerByType(map, type).forEach(element => {
      element.show();
    });
  },

  /**
   * lockingMarker 定位单个marker点
   * @param {*} map
   * @param {*} id 查找的id
   * @param {*} obj ={ 若不传obj对象，则默认状态。若自定义，则每一个属性都要赋值，否则会报错
   *         animation: 是否开启动画
   *         position: map是否跟随
   *        }
   */
  lockingMarker(map, obj, param = { mark: true, other: true }) {
    let id = this.getType(obj);
    let marker = this.getMarkerById(map, id)
    let pos = marker.getPosition();
    map.panTo([pos.lng, pos.lat])
    map.setFitView(marker);
    if (!param.other) {
      map.getAllOverlays('marker').forEach(element => {
        element.dom.childNodes.forEach(item => {
          if (item.nodeType == 1) {
            new AMap.DomUtil.removeClass(item, 'AMAP_ANIMATION_BOUNCE')
            new AMap.DomUtil.removeClass(item, 'AMAP_ANIMATION_SCALE')
          }
        });
      });
    }
    if (param.mark) {
      marker.dom.childNodes.forEach(item => {
        if (item.nodeType == 1) {
          new AMap.DomUtil.addClass(item, markerType[obj.type].animation)
        }
      });
    }
  },

  /**
   * polyEditor 编辑单位函数
   * @param {*} position 初始坐标
   * @returns polyEditor
   * polyEditor：编辑工具obj
   */
  polyEditor(map, obj) {
    map.setRotation(0);
    map.setPitch(0);
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
    map.add(polygon);
    // 缩放地图到合适的视野级别
    map.setFitView([polygon]);
    // 创建多边形编辑工具，并启动编辑。
    let polyEditor = new AMap.PolyEditor(map, polygon);
    polyEditor.open();
    // 返回矢量图形，及编辑工具obj。
    return polyEditor;
  },

  /**
   * 加载楼块
   * @param {*} areas 楼块对象
   */
  createUnitArea(map, areas) {
    let buildingLayer = new AMap.Buildings({
      zIndex: 130,
      zooms: [2, 20],
      merge: false,
      sort: false
    });
    let options = {
      // 是否隐藏设定区域外的楼块
      hideWithoutStyle: false,
      // 围栏
      areas: areas
    };
    //此配色优先级高于自定义mapStyle
    buildingLayer.setStyle(options);
    map.setLayers([AMap.createDefaultLayer(), buildingLayer]);

    // 画范围及标识
    let polygons = [];
    areas.forEach(element => {
      let polygon = new AMap.Polygon({
        path: element.path,
        strokeColor: "#000000",
        strokeWeight: 0,
        strokeOpacity: 0.2,
        fillOpacity: element.hasOwnProperty('style') && element.style.hasOwnProperty('fillOpacity') ? element.style.fillOpacity : '0.5',
        fillColor: element.color,
        zIndex: 50
      });
      map.add(polygon);
      polygons.push(polygon)

      let obj = {
        type: element.type,
        id: element.id,
        x: element.center.lng,
        y: element.center.lat,
        filter: true,
        name: element.name,
        tip: element.tip,
        tipBase: element.color
      };

      this.addUnitMarker(map, obj);
    });
    map.setFitView(polygons);
  },

  /**
   * 路线规划
   * @param {地图对象} map
   * @param {开始坐标} star
   * @param {结束坐标} end
   */
  drivingPolicy(map, opt, callback) {
    map.plugin(["AMap.Driving"], () => { //加载驾车服务插件
      // 构造路线导航类
      let driving = new AMap.Driving({
        policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
        map: map
      });
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(opt.star.lng, opt.star.lat),
        new AMap.LngLat(opt.end.lng, opt.end.lat),
        (status, result) => {
          // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              console.log(result)
              callback();
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              // callback(drawRoute(map, result.routes[0], opt.color));
            }
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        }
      );
    });
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
    let passedPolyline = new AMap.Polyline({
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
