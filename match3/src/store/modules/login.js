import { login, logout } from '../../service/AuthService';

export default {
  namespaced: true,
  state: {
    userData: '',
    userName: '',
    errorMessage: ''
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setUserName(state, userName) {
        state.userName = userName;
      },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    resetState(state) {
        state.userData = ''; 
        state.userName = '';
        state.errorMessage = '';
      }
  },
  actions: {
    async handleLogin({ commit }, {username, password}) {
      try {
        const userData = await login(username, password);
        commit('setUserData', userData);
        commit('setUserName', username);
        commit('setErrorMessage', '');
      } catch (error) {
        commit('setErrorMessage', error.message);
      }
    },
    async handleLogout({ state, commit }) {
        try {
          await logout(state.userData.token);
          commit('resetState');
        } catch (error) {
          commit('setErrorMessage', error.message);
        }
      }
  },
  getters: {
    userName: state => state.userName,
    userId: state => state.userData.userId,
    token: state => state.userData.token,
    isLogged: state => !!state.userData, // check on it
  }
};
