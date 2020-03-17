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
      title: "我是一点marker",
      content: initMarkerIcon(obj.icon),
      anchor: "bottom-center",
      offset: new AMap.Pixel(0, 0)
    });
    return marker;
  }
};

export default vMap;
