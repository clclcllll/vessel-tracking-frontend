// src/utils/auth.js

const TOKEN_KEY = 'jwt_token';
const USER_INFO_KEY = 'user_info'; // 修复：增加 USER_INFO_KEY 的定义

// Token 操作
export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

// 用户信息操作
export function getUserInfo() {
    try {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null; // 确保安全解析 JSON
    } catch (error) {
        console.error('解析 userInfo 时出错:', error); // 增加错误日志
        return null; // 如果解析出错，返回 null
    }
}

export function setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function removeUserInfo() {
    localStorage.removeItem('userInfo');
}
