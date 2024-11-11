<template>
  <el-container style="height: 100vh;">
    <el-header style="background-color: #409EFF; color: white; text-align: center; font-size: 24px;">
      船舶位置与气象信息系统
    </el-header>
    <el-container>
      <MapView />
    </el-container>
  </el-container>
</template>

<script>
import MapView from "./components/MapView.vue"; // 确保路径正确

export default {
  name: "App",
  components: {
    MapView,
  },
};
</script>

<style>
/* App.vue 的全局样式 */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
