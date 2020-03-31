// import router from "../../router";
import AMap from "AMap";
// 公共参数
var markerBackColor = "font-color-level1";
var markerIconColor = "back-color";
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

// 全局vMap函数
const vMap = {
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
    return marker;
  }
};

export default vMap;
