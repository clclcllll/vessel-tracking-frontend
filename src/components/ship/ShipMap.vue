<!-- src/components/ShipMap.vue -->
<template>
  <div id="map" class="ship-map"></div>
</template>

<script>
import { onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'ShipMap',
  setup() {
    const store = useStore();
    let map;
    let trajectoryLayer;

    const initMap = () => {
      map = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    };

    const drawTrajectory = (trajectory) => {
      if (trajectoryLayer) {
        trajectoryLayer.remove();
      }
      const latlngs = trajectory.map((point) => [
        point.latitude / 1e6, // 转换为标准的经纬度格式
        point.longitude / 1e6, // 转换为标准的经纬度格式
      ]);
      trajectoryLayer = L.polyline(latlngs, { color: 'blue' }).addTo(map);
      map.fitBounds(trajectoryLayer.getBounds());
    };





    onMounted(() => {
      initMap();
    });

    watch(
        () => store.state.ship.trajectory,
        (newTrajectory) => {
          if (newTrajectory.length) {
            drawTrajectory(newTrajectory);
          }
        }
    );

    return {};
  },
};
</script>

<style scoped>
.ship-map {
  flex: 1;
  height: 100vh;
}
</style>
