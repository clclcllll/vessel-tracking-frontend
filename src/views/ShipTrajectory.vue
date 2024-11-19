<!-- src/views/ShipTrajectory.vue -->
<template>
  <div class="ship-trajectory">
    <ShipList />
    <ShipMap />
  </div>
</template>

<script>
import ShipList from '../components/ship/ShipList.vue';
import ShipMap from '../components/ship/ShipMap.vue';

export default {
  name: 'ShipTrajectory',
  components: {
    ShipList,
    ShipMap,
  },
};
</script>

<style scoped>
.ship-trajectory {
  display: flex;
}
</style>
