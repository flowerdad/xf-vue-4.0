<template>
  <div class="map" id="map"></div>
</template>

<script>
export default {
  data() {
    return {
      map: Object
    };
  },
  methods: {},
  mounted() {
    this.map = this.vMap.initMap();
    this.$store.commit("map", this.map);
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100vh;
}
</style>
