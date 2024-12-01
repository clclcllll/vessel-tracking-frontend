// src/store/modules/port.js
import { fetchPortsApi, fetchPortDetails } from '@/api/portApi'; // 引入获取港口数据的 API

const state = {
    ports: [],           // 港口列表
    selectedPort: null,  // 当前选中的港口
    portInfo: null,      // 港口的详细信息
};

const getters = {
    ports: (state) => state.ports,          // 获取所有港口
    selectedPort: (state) => state.selectedPort,  // 获取选中的港口
    portInfo: (state) => state.portInfo,      // 获取港口的详细信息
};

const mutations = {
    SET_PORTS(state, ports) {
        state.ports = ports;  // 设置港口列表
    },
    SET_SELECTED_PORT(state, port) {
        state.selectedPort = port;  // 设置选中的港口
    },
    SET_PORT_INFO(state, portInfo) {
        state.portInfo = portInfo;  // 设置港口详细信息
    },
};

const actions = {
    // 获取港口列表
    async fetchPorts({ commit }) {
        commit('SET_LOADING', true);  // 开始加载
        try {
            const response = await fetchPortsApi();  // 从 API 获取数据
            console.log('从后端获取的数据：', response);  // 打印响应数据，确保它符合预期
            commit('SET_PORTS', response.data.ports);  // 更新 Vuex 中的 ports 数据
        } catch (error) {
            console.error('获取港口数据失败:', error);  // 请求失败时输出错误
        } finally {
            commit('SET_LOADING', false);  // 完成加载
        }
    },

    // 获取指定港口的详细信息
    async fetchPortDetails({ commit }, portId) {
        try {
            const response = await fetchPortDetails(portId);  // 从 API 获取港口详情
            commit('SET_PORT_INFO', response.data.port);  // 更新港口详细信息
        } catch (error) {
            console.error('获取港口详细信息失败:', error);
        }
    },

    // 设置选中的港口并加载其详细信息
    selectPort({ commit, dispatch }, port) {
        commit('SET_SELECTED_PORT', port);  // 设置选中的港口
        dispatch('fetchPortDetails', port.id);  // 获取该港口的详细信息
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
