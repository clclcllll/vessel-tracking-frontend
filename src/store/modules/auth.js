// src/store/modules/auth.js
import { login, logout, register } from '@/api/authApi';
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth';

const state = {
    token: getToken() || null , // 从本地存储初始化 Token
    userInfo: getUserInfo() || null, // 从本地存储初始化用户信息
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
        setToken(token); // 同步到本地存储
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
        setUserInfo(userInfo); // 同步到本地存储
    },
    RESET_AUTH(state) {
        state.token = null;
        state.userInfo = null;
        removeToken(); // 清除本地存储
        removeUserInfo(); // 清除本地存储
    },
};

const actions = {
    // 登录逻辑
    async login({ commit }, { username, password }) {
        try {
            const { data } = await login(username, password);
            const token = data.token;
            const userInfo = { username: data.username }; // 包装为 userInfo
            commit('SET_TOKEN', token);
            commit('SET_USER_INFO', userInfo);
            setToken(token);
            setUserInfo(userInfo);
        } catch (error) {
            console.error('登录失败:', error);
            throw error;
        }
    },

    // 注册逻辑
    async register(_, { username, password }) {
        try {
            await register(username, password); // 只需调用 API
        } catch (error) {
            console.error('注册失败:', error);
            throw error;
        }
    },

    // 注销逻辑
    logout({ commit }) {
        // 调用后端注销接口（如果需要）
        logout().catch(() => {
            console.warn('注销接口调用失败，但已重置本地存储'); // 处理后端注销接口调用失败的情况
        });
        commit('RESET_AUTH'); // 清空 Vuex 和本地存储
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
