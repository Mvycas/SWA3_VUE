// store/index.js
import { createStore } from 'vuex'
import login from './modules/login';

export default createStore({
  modules: {
    login  }
});
