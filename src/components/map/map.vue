<template>
  <div class="map" id="map"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.vMap.map.initMap();
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
}
</style>
