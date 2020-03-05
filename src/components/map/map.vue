<template>
  <div class="map" id="map"></div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      map: Object
    };
  },
  methods: {
    mapInit() {
      this.map = new AMap.Map("map", {
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
    }
  },
  mounted() {
    this.mapInit();
    // console.log(vMap);
    this.map.add(this.vMap.addMarker(116.353897, 40.072519));
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
}
</style>
