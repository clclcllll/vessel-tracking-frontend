// src/utils/request.js

import axios from 'axios';
import {getToken, removeToken, setToken} from './auth';

// 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || '/', // 从环境变量中读取 API 基础路径
    timeout: parseInt(import.meta.env.VITE_APP_REQUEST_TIMEOUT, 10) || 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前，携带 JWT 令牌
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 如果后端返回新的令牌，可以在此更新
        const newToken = response.headers['Authorization'] || response.headers['authorization'];
        if (newToken) {
            setToken(newToken);
        }
        return response;
    },
    (error) => {
        // 处理响应错误
        let message = '';
        if (error.response) {
            const { status, data } = error.response;
            message = data.message || `请求错误：${status}`;

            // 如果令牌失效，移除令牌并跳转到登录页
            if (status === 401 || status === 403) {
                removeToken();
                alert('登录已过期，请重新登录。');
                window.location.href = '/login'; // 根据实际的登录路由调整
            } else {
                alert(message);
            }
        } else {
            message = error.message || '网络错误';
            alert(message);
        }

        return Promise.reject(error);
    }
);

export default service;
