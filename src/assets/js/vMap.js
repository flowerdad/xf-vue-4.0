// import router from "../../router";
import AMap from "AMap";
import store from "@/store/index.js";

//maker点类型
let markerType = {
  unit: {
    type: 'unit',
    zIndex: 10,
    animation: 'AMAP_ANIMATION_BOUNCE'
  },
  card: {
    type: 'card',
    back: 'danger-color-100',
    color: 'blacks-color-100',
    size: 'width-24 height-24 size-24',
    zIndex: 1,
    animation: 'AMAP_ANIMATION_SCALE'
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

// 驾车策略 
// let policy = {
//   // 最快捷模式
//   LEAST_TIME: AMap.DrivingPolicy.LEAST_TIME,
//   // 最经济模式
//   LEAST_FEE: AMap.DrivingPolicy.LEAST_FEE,
//   // 最短距离模式
//   LEAST_DISTANCE: AMap.DrivingPolicy.LEAST_DISTANCE,
//   // 考虑实时路况
//   REAL_TRAFFIC: AMap.DrivingPolicy.REAL_TRAFFIC,
// }


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
      position: obj.position,
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
    return marker;
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
    let markers = [];
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

      markers.push(this.addUnitMarker(map, obj))
    });
    map.setFitView(markers);
  },

  // 下方策略仅返回一条路径规划结果
  // 0，速度优先，不考虑当时路况，此路线不一定距离最短
  // 1，费用优先，不走收费路段，且耗时最少的路线
  // 2，距离优先，不考虑路况，仅走距离最短的路线，但是可能存在穿越小路 / 小区的情况
  // 3，速度优先，不走快速路，例如京通快速路（因为策略迭代，建议使用13）
  // 4，躲避拥堵，但是可能会存在绕路的情况，耗时可能较长
  // 5，多策略（同时使用速度优先、费用优先、距离优先三个策略计算路径）。
  // 其中必须说明，就算使用三个策略算路，会根据路况不固定的返回一~三条路径规划信息。
  // 6，速度优先，不走高速，但是不排除走其余收费路段
  // 7，费用优先，不走高速且避免所有收费路段
  // 8，躲避拥堵和收费，可能存在走高速的情况，并且考虑路况不走拥堵路线，但有可能存在绕路和时间较长
  // 9，躲避拥堵和收费，不走高速

  // 下方策略返回多条路径规划结果
  // 10，返回结果会躲避拥堵，路程较短，尽量缩短时间，与高德地图的默认策略也就是不进行任何勾选一致
  // 11，返回三个结果包含：时间最短；距离最短；躲避拥堵 （由于有更优秀的算法，建议用10代替）
  // 12，返回的结果考虑路况，尽量躲避拥堵而规划路径，与高德地图的“躲避拥堵”策略一致
  // 13，返回的结果不走高速，与高德地图“不走高速”策略一致
  // 14，返回的结果尽可能规划收费较低甚至免费的路径，与高德地图“避免收费”策略一致
  // 15，返回的结果考虑路况，尽量躲避拥堵而规划路径，并且不走高速，与高德地图的“躲避拥堵 & 不走高速”策略一致
  // 16，返回的结果尽量不走高速，并且尽量规划收费较低甚至免费的路径结果，与高德地图的“避免收费 & 不走高速”策略一致
  // 17，返回路径规划结果会尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果，与高德地图的“躲避拥堵 & 避免收费”策略一致
  // 18，返回的结果尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路，与高德地图的“避免拥堵 & 避免收费 & 不走高速”策略一致
  // 19，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
  // 20，返回的结果会优先考虑高速路，并且会考虑路况躲避拥堵，与高德地图的“躲避拥堵 & 高速优先”策略一致
  routePlanning(map, opt, callback) {
    map.plugin(["AMap.Driving"], () => {
      // 构造路线导航类
      let driving = new AMap.Driving({
        policy: opt.policy ? opt.policy : 10,
        map: map
      });
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(opt.star.lng, opt.star.lat),
        new AMap.LngLat(opt.end.lng, opt.end.lat),
        (status, result) => {
          // https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              console.log(result)
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              callback(result);
            }
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        }
      );
    });
  },


  // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
  parseRouteToPath(route) {
    let path = [];
    for (let i = 0, l = route.steps.length; i < l; i++) {
      let step = route.steps[i];

      for (let j = 0, n = step.path.length; j < n; j++) {
        path.push(step.path[j]);
      }
    }
    return path;
  },

  // 画路线
  drawLine(map, obj) {
    new AMap.Marker({
      position: obj.start,
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
      map: map
    });

    new AMap.Marker({
      position: obj.end,
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
      map: map
    });

    let line = new AMap.Polyline({
      path: obj.path,
      isOutline: true,
      outlineColor: "#525252",
      borderWeight: 1,
      strokeWeight: 5,
      strokeColor: obj.strokeColor,
      lineJoin: "round"
    });
    map.add(line)

    // 调整视野达到最佳显示区域
    map.setFitView(line);
    return line;
  },

  /**
   * 轨迹
   * @param {map对象} map
   * @param {起点坐标} position
   */
  drivTrajectory(map, obj) {
    // 汽车对象
    let marker = new AMap.Marker({
      map: map,
      position: obj.center,
      icon: "https://webapi.amap.com/images/car.png",
      offset: new AMap.Pixel(-26, -13),
      autoRotation: true,
      angle: -90
    });
    return marker;
  }
};

export default {
  markerType,
  mapConfig,
  map
};
