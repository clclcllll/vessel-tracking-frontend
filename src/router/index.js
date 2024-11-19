// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/AuthView.vue';
import store from '@/store';

const routes = [
    {
        path: '/Home',
        name: 'HomeView',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 导航守卫，检查登录状态
// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.meta.requiresAuth;
//     const isAuthenticated = store.getters['auth/isAuthenticated'];
//
//     if (requiresAuth && !isAuthenticated) {
//         next('/login');
//     } else {
//         next();
//     }
// });

export default router;
