import { login, logout } from '../../service/AuthService';

export default {
  namespaced: true,
  state: {
    isLogged: false,
    userData: '',
    userName: '',
    errorMessage: ''
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
      state.isLogged = true;
    },
    setUserName(state, userName) {
        state.userName = userName;
      },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    resetState(state) {
        state.userData = ''; 
        state.isLoggedIn = false; 
        state.userName = '';
        state.errorMessage = '';
      }
  },
  actions: {
    async handleLogin({ commit }, {username, password}) {
      try {
        const userData = await login(username, password);
        commit('setUserName', username);
        commit('setUserData', userData);
        commit('setErrorMessage', '');
      } catch (error) {
        commit('setErrorMessage', "Bad credentials");
      }
    },
    async handleLogout({ state, commit }) {
        try {
          await logout(state.userData.token);
          commit('resetState');
        } catch (error) {
          commit('setErrorMessage', "Logout failed: No user is logged in");
        }
      }
  },
  getters: {
    userName: state => state.userName,
    userId: state => state.userData.userId,
    token: state => state.userData.token,
    isLogged: state => state.isLogged, // check on it
    errorMessage: state => state.errorMessage,
  }
};
