<template>
  <el-container style="height: 100%;">
    <!-- 左侧栏：气象信息 -->
    <el-aside width="20%" style="background-color: #f5f5f5;">
      <div class="sidebar">
        <h3>气象信息</h3>
        <p>温度：24°C</p>
        <p>湿度：60%</p>
        <p>风速：15 km/h</p>
      </div>
    </el-aside>

    <!-- 中间区域：谷歌地图 -->
    <el-main style="padding: 0;">
      <div id="map" class="map-container"></div>
    </el-main>

    <!-- 右侧栏：数据栏 -->
    <el-aside width="20%" style="background-color: #f5f5f5;">
      <div class="sidebar">
        <h3>数据栏</h3>
        <p>船只数量：5</p>
        <p>航线状态：正常</p>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import { onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "MapView",
  setup() {
    onMounted(() => {
      const loader = new Loader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 请将此处替换为您的 Google Maps API 密钥
        version: "weekly",
      });

      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 0, lng: 0}, // 地图中心
          zoom: 2, // 初始缩放级别
        });
      });
    });
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

.sidebar {
  padding: 20px;
}
</style>
