// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // 明确指定 index.js
import store from './store/index.js'; // 同样指定 index.js

import './assets/tailwind.css'; // 导入 Tailwind CSS


const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
