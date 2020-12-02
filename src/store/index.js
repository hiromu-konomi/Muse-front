import Vue from "vue";
import Vuex from "vuex";
import reviewFrom from "./reviewForm.js";
import userDetail from "./userDetail.js";
import firebase from "firebase";
// import userLogin from "./userLogin.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login_user: null,
    userId: null,
  },
  getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
  },
  modules: {
    rForm: reviewFrom,
    uDetail: userDetail,
  },
});

export default store;
