// src/api/authApi.js
import request from '@/utils/request';

// 用户登录
export function login(username, password) {
    return request.post('/api/auth/login', {
        username,
        password,
    });
}

// 用户注销（可选）
export function logout() {
    return request.post('/api/auth/logout');
}
