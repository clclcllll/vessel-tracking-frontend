// src/store/modules/auth.js
import { login, logout } from '@/api/authApi';
import { getToken, setToken, removeToken } from '@/utils/auth';

const state = {
    token: getToken(),
    userInfo: null,
};

const getters = {
    token: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
    userInfo: (state) => state.userInfo,
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },
};

const actions = {
    async login({ commit }, { username, password }) {
        try {
            const response = await login(username, password);
            const token = response.data.token; // 根据后端返回的数据结构调整
            commit('SET_TOKEN', token);
            setToken(token);
            // 如果后端返回用户信息，可以在此存储
            // commit('SET_USER_INFO', response.data.user);
        } catch (error) {
            console.error('登录失败:', error);
            throw error;
        }
    },
    logout({ commit }) {
        // 可选地调用注销 API
        removeToken();
        commit('SET_TOKEN', null);
        commit('SET_USER_INFO', null);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
