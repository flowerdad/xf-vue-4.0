<template>
  <div class="map" id="map"></div>
</template>

<script>
import AMap from "AMap";
export default {
  methods: {
    mapInit() {
      new AMap.Map("map", {
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
        center: [116.353897, 40.072519]
      });
    }
  },
  mounted() {
    this.mapInit();
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
}
</style>
