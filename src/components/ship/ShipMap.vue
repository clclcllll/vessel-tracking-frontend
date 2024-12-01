<!-- src/components/ShipMap.vue -->
<template>
  <div id="map" class="ship-map"></div>
</template>

<script>
import { onMounted, watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'ShipMap',
  setup() {
    const store = useStore();
    let map;
    let trajectoryLayer;
    store.dispatch('port/fetchPorts');
    const ports = computed(() => store.state.port.ports);
    const loading = computed(() => store.state.port.loading);
    const portMarkers = ref([]);  // 使用 ref 来存储港口标记，确保它是响应式的

    const initMap = () => {
      map = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    };

    const drawPorts = (ports) => {
      console.log("港口数据：", ports);

      // 确保 portMarkers.value 是一个数组
      if (!Array.isArray(portMarkers.value)) {
        console.error("portMarkers.value 不是一个有效的数组");
        return;
      }

      // 移除已有的港口标记（如果有）
      portMarkers.value.forEach(marker => marker.remove());
      portMarkers.value = [];  // 清空标记数组

      // 遍历港口数据，为每个港口添加标记
      ports.forEach((port, index) => {
        console.log(`港口 ${index + 1} 的经纬度:`, port.latitude, port.longitude);

        // 检查经纬度是否有效，如果无效则跳过该港口
        if (port.latitude && port.longitude) {  // 确保港口有有效的经纬度
          const latitude = port.latitude;  // 转换纬度
          const longitude = port.longitude;  // 转换经度

          console.log(`经纬度: ${latitude}, ${longitude}`);

          // 创建一个圆形标记
          const circle = L.circleMarker([latitude, longitude], {
            radius: 8,  // 圆的半径，单位是像素
            color: 'blue',  // 圆的边框颜色
            fillColor: 'blue',  // 填充颜色
            fillOpacity: 0.5,  // 填充的透明度
          }).addTo(map);  // 将圆形标记添加到地图上

          // 为每个港口添加点击事件
          circle.on('click', () => {
            // 调用 Vuex 中的 fetchPortDetails 获取港口的详细信息
            store.dispatch('port/fetchPortDetails', port.id)
                .then(() => {
                  const portInfo = store.state.port.portInfo;

                  // 构建弹窗的内容，显示所有字段
                  const popupContent = `
                  <b>${portInfo.portName}</b><br>
                  <b>国家:</b> ${portInfo.country}<br>
                  <b>地址:</b> ${portInfo.address}<br>
                  <b>电话:</b> ${portInfo.phone}<br>
                  <b>传真:</b> ${portInfo.fax}<br>
                  <b>港口类型:</b> ${portInfo.portType}<br>
                  <b>港口码:</b> ${portInfo.portCode}<br>
                  <b>锚地:</b> ${portInfo.anchorage}<br>
                  <b>时区:</b> ${portInfo.timeZone}<br>
                  <b>网站:</b> <a href="http://${portInfo.website}" target="_blank">${portInfo.website}</a><br>
                  <b>港口管理:</b> ${portInfo.portAuthority}<br>
                  <b>泊位草图号:</b> ${portInfo.chartNumber}<br>
                `;

                  // 使用弹窗显示港口详细信息
                  circle.bindPopup(popupContent).openPopup();
                })
                .catch((error) => {
                  console.error('获取港口详细信息失败:', error);
                });
          });

          // 将标记存储到 portMarkers 数组
          portMarkers.value.push(circle);

          console.log(`港口 ${port.portName} 已添加标记`);
        } else {
          console.log(`港口 ${port.portName} 没有有效的经纬度，跳过该港口`);
        }
      });

      // 调整地图视图以适应所有港口标记
      if (portMarkers.value.length > 0) {
        const bounds = L.latLngBounds(portMarkers.value.map(marker => marker.getLatLng()));
        map.fitBounds(bounds);  // 调整地图视图以显示所有港口标记
      }
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

    // 使用 watch 来监听 ports 数据变化，确保数据加载后执行渲染
    watch(ports, (newPorts) => {
      if (newPorts && newPorts.length > 0) {  // 确保 ports 是有效的数组
        console.log("港口数据加载完成，渲染港口：", newPorts);
        drawPorts(newPorts);  // 数据加载完成后渲染港口
      } else {
        console.log("港口数据为空或正在加载...");
      }
    }, { immediate: true });  // immediate: true 保证在组件挂载时立即执行一次

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
