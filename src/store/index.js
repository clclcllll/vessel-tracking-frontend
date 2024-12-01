// src/store/index.js

import { createStore } from 'vuex';
import ship from './modules/ship';
import auth from './modules/auth';
import port from "@/store/modules/port.js";

const store = createStore({
    modules: {
        ship,
        auth,
        port,
    },
});

export default store;
