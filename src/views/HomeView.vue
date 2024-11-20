<template>
  <div class="home-view">
    <!-- 顶部导航栏 -->
    <TopNavBar />

    <!-- 主内容区域 -->
    <div class="main-content">
      <ShipList />
      <ShipMap />
      <ShipInfo />
    </div>
  </div>
</template>

<script>
import TopNavBar from '../components/common/TopNavBar.vue';
import ShipList from '../components/ship/ShipList.vue';
import ShipMap from '../components/ship/ShipMap.vue';
import ShipInfo from '../components/ship/ShipInfo.vue';

export default {
  name: 'HomeView',
  components: {
    TopNavBar,
    ShipList,
    ShipMap,
    ShipInfo,
  },
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-nav-bar {
  height: 60px; /* 顶部导航栏高度 */
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.ship-trajectory {
  display: flex;
  flex: 1;
}
</style>
