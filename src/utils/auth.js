// src/utils/auth.js

const TOKEN_KEY = 'jwt_token';

// 获取令牌
export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

// 设置令牌
export function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

// 移除令牌
export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}
