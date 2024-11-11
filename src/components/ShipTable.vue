<template>
  <div>
    <h2>Ship Table</h2>
    <el-table :data="ships">
      <el-table-column prop="name" label="Ship Name"></el-table-column>
      <el-table-column prop="status" label="Status"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ShipTable',
  setup() {
    const ships = ref([
      { name: 'Ship A', status: 'Active' },
      { name: 'Ship B', status: 'Inactive' },
    ]);
    return { ships };
  },
};
</script>

<style scoped>
h2 {
  color: #333;
}
</style>
