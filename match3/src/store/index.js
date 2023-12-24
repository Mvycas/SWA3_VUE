// store/index.js
import { createStore } from 'vuex'
import login from './modules/login';
import game from './modules/game';

export default createStore({
  modules: {
    login,
    game
    }
});
