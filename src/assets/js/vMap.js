// import router from "../../router";
import AMap from "AMap";
// var icon = "icon-shuidi-";
var con = `
  <div class="custom-content-marker">
    <i class="iconfont map-marker-shuidi font-color-level1 icon-shuidi-">
      <i class="el-icon-user-solid"></i>
    </i>
  </div>
  `;
const vMap = {
  addMarker(x, y) {
    var marker = new AMap.Marker({
      position: new AMap.LngLat(x, y),
      content: con,
      anchor: "bottom-center",
      offset: new AMap.Pixel(0, 0)
    });
    return marker;
  }
};

export default vMap;
