<template>
  <div class="flex flex-col w-72 border-r border-gray-300 h-screen overflow-hidden">
    <h2 class="text-lg font-bold p-4 border-b border-gray-300">选择船舶</h2>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索船舶"
        @input="onSearch"
        class="px-4 py-2 m-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
    />
    <div class="overflow-y-auto flex-grow">
      <ul class="space-y-1">
        <li
            v-for="ship in filteredShips"
            :key="ship.id"
            @click="onSelectShip(ship)"
            :class="[
            'px-4 py-2 cursor-pointer hover:bg-gray-200',
            ship.id === selectedShip?.id ? 'bg-blue-100 font-bold' : ''
          ]"
        >
          {{ ship.ship_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ShipList",
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState("ship", ["ships", "selectedShip"]),
    filteredShips() {
      // 根据搜索框过滤船舶
      return this.ships.filter((ship) =>
          ship.ship_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions("ship", ["fetchShips", "selectShip", "fetchTrajectory"]),
    onSearch() {
      // Vue 响应式会自动处理过滤
    },
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
/* Tailwind CSS 已应用，避免自定义 CSS */
</style>
