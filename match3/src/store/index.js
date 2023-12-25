// store/index.js
import login from './modules/login';
import game from './modules/game';
import { createStore } from 'vuex'

export const store = createStore({
  modules: {
    login,
    game
    },
});

export default store;
