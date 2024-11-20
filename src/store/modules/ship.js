// src/store/modules/ship.js
import { fetchShips, fetchTrajectory, fetchShipDetails } from '@/api/shipApi';

const state = {
    ships: [],
    selectedShip: null,
    trajectory: [],
    shipInfo: null, // 新增状态：保存船舶详细信息
};

const getters = {
    ships: (state) => state.ships,
    selectedShip: (state) => state.selectedShip,
    trajectory: (state) => state.trajectory,
    shipInfo: (state) => state.shipInfo, // Getter
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
    SET_SHIP_INFO(state, shipInfo) {
        state.shipInfo = shipInfo; // 新增 Mutation
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
    async fetchShipDetails({ commit }, shipId) {
        try {
            const response = await fetchShipDetails(shipId);
            commit('SET_SHIP_INFO', response.data); // 保存详细信息到状态
        } catch (error) {
            console.error('获取船舶详细信息失败:', error);
        }
    },
    selectShip({ commit,dispatch }, ship) {
        commit('SET_SELECTED_SHIP', ship);
        dispatch('fetchShipDetails', ship.id); // 确保使用 dispatch 调用另一个 action
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
