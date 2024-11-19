// src/store/index.js

import { createStore } from 'vuex';
import ship from './modules/ship';
import auth from './modules/auth';

const store = createStore({
    modules: {
        ship,
        auth,
    },
});

export default store;
