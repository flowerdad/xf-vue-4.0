// import router from "../../router";
import AMap from "AMap";
var icon = "el-icon-star-on";
var content =
  '<div class="custom-content-marker">' +
  '   <i class="' +
  icon +
  '"></i>' +
  "</div>";
const vMap = {
  addMarker(x, y) {
    var marker = new AMap.Marker({
      position: new AMap.LngLat(x, y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: "北京",
      content: content
    });
    return marker;
  }
};

export default vMap;
