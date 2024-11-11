// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // 明确指定 index.js
import store from './store/index.js'; // 同样指定 index.js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app');
