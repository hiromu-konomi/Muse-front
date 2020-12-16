import Vue from "vue";
import Vuex from "vuex";
import reviewFrom from "./reviewForm.js";
import userDetail from "./userDetail.js";
import firebase from "firebase";
import showUser from "./showUser.js";
import followUser from "./followUser.js";
import groupDetail from "./groupDetail.js";

// import userLogin from "./userLogin.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login_user: null,
    userNum: null,
  },
  getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    getUserbyUserNum: (state) => (id) =>
      state.sUser.usersData.find((user) => user.userNum === id),
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setUserId(state, userNum) {
      state.userNum = userNum;
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
    setUserId({ commit }, userNum) {
      commit("setUserId", userNum);
    },
  },
  modules: {
    rForm: reviewFrom,
    uDetail: userDetail,
    sUser: showUser,
    fUser: followUser,
    gDetail: groupDetail,

  },
});

export default store;
