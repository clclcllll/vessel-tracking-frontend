// src/store/modules/ship.js
import { fetchShips, fetchTrajectory } from '@/api/shipApi';

const state = {
    ships: [],
    selectedShip: null,
    trajectory: [],
};

const getters = {
    ships: (state) => state.ships,
    selectedShip: (state) => state.selectedShip,
    trajectory: (state) => state.trajectory,
};

const mutations = {
    SET_SHIPS(state, ships) {
        state.ships = ships;
    },
    SET_SELECTED_SHIP(state, ship) {
        state.selectedShip = ship;
    },
    SET_TRAJECTORY(state, trajectory) {
        state.trajectory = trajectory;
    },
};

const actions = {
    async fetchShips({ commit }) {
        try {
            const response = await fetchShips();
            commit('SET_SHIPS', response.data);
        } catch (error) {
            console.error('获取船舶列表失败:', error);
        }
    },
    // 从后端获取轨迹数据
    async fetchTrajectory({ commit }, { shipId, startTime, endTime }) {
        try {
            const response = await fetchTrajectory(shipId, startTime, endTime);
            console.log('后端返回轨迹数据:', response.data); // 验证是否已格式化为小数点
            commit('SET_TRAJECTORY', response.data);
        } catch (error) {
            console.error('获取轨迹数据失败:', error);
        }
    },
    selectShip({ commit }, ship) {
        commit('SET_SELECTED_SHIP', ship);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
