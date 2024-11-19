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
        // 如果响应中包含 token，将其保存
        if (response.config.url.includes('/api/auth/login')) {
            const token = response.data; // 登录接口的响应体直接是 Token
            if (token) {
                setToken(token); // 保存到本地存储
                console.log('新 Token:', token); // 打印新的 token 方便调试
            }
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
                window.location.href = '/'; // 重新登录
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
