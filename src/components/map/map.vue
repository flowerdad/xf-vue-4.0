<template>
  <div class="map" id="map"></div>
</template>

<script>
export default {
  props: {
    type: String
  },
  mounted() {
    this.vMap.map.initMap(this.type);
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
  position: absolute;
}
</style>
