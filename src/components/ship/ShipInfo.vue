<template>
  <div class="ship-info flex flex-col p-4 border-l border-gray-300 h-screen">
    <h2 class="text-lg font-bold mb-4">船舶详细信息</h2>
    <div v-if="shipInfo">
      <p><strong>船名：</strong>{{ shipInfo.ship.ship_name }}</p>
      <p><strong>MMSI：</strong>{{ shipInfo.ship.mmsi }}</p>
      <p><strong>IMO：</strong>{{ shipInfo.ship.imo }}</p>
      <p><strong>呼号：</strong>{{ shipInfo.ship.callSign }}</p>
      <p><strong>船长：</strong>{{ shipInfo.ship.length }} 米</p>
      <p><strong>船宽：</strong>{{ shipInfo.ship.width }} 米</p>
      <p><strong>吃水深度：</strong>{{ shipInfo.ship.draft / 1000 }} 米</p>
      <p><strong>国家：</strong>{{ shipInfo.country.countryName }}</p>
      <p><strong>船舶类型：</strong>{{ shipInfo.shipType.typeName || '未知' }}</p>
      <p><strong>预计到达时间：</strong>{{ formatDate(shipInfo.ship.eta) }}</p>
      <p><strong>航次出发地点：</strong>{{ shipInfo.departurePort || '未知' }}</p>
      <p><strong>航次到达地点：</strong>{{ shipInfo.voyage.arrival || '未知' }}</p>
    </div>
    <div v-else>
      <p>未选择任何船舶，请从左侧选择一艘船。</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShipInfo",
  computed: {
    ...mapState("ship", ["shipInfo"]),
  },
  watch: {
    shipInfo(newValue, oldValue) {
      console.log("船舶详细信息已更新:", newValue);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "未知";
      const d = new Date(date);
      return d.toLocaleString();
    },
  },
  mounted() {
    console.log("初次加载的船舶信息:", this.shipInfo);
  },
};
</script>
