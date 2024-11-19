<!-- src/components/ShipList.vue -->
<template>
  <div class="ship-list">
    <h2>选择船舶</h2>
    <ul>
      <li
          v-for="ship in ships"
          :key="ship.id"
          @click="onSelectShip(ship)"
          :class="{ selected: ship.id === selectedShip?.id }"
      >
        {{ ship.ship_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as selectedShip from "element-plus/es/locale/index";

export default {
  name: 'ShipList',
  computed: {
    selectedShip() {
      return selectedShip
    },
    ...mapState('ship', ['ships', 'selectedShip']),
  },
  methods: {
    ...mapActions('ship', ['fetchShips', 'selectShip', 'fetchTrajectory']),
    onSelectShip(ship) {
      this.selectShip(ship);
      this.fetchTrajectory({ shipId: ship.id });
    },
  },
  mounted() {
    this.fetchShips();
  },
};
</script>

<style scoped>
.ship-list {
  width: 200px;
  border-right: 1px solid #ccc;
}

.ship-list ul {
  list-style: none;
  padding: 0;
}

.ship-list li {
  padding: 10px;
  cursor: pointer;
}

.ship-list li.selected {
  background-color: #f0f0f0;
  font-weight: bold;
}
</style>
