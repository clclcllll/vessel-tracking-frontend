<template>
  <el-container>
    <el-header>原油运输船舶数据可视化平台</el-header>
    <el-main>
      <MapView />
    </el-main>
  </el-container>
</template>

<script>
import MapView from '@/components/MapView.vue';

export default {
  name: 'HomeView',
  components: {
    MapView,
  },
};
</script>

<style scoped>
.el-header {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
