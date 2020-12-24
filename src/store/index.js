import Vue from "vue";
import Vuex from "vuex";
import reviewFrom from "./reviewForm.js";
import userDetail from "./userDetail.js";
import firebase from "firebase";
import showUser from "./showUser.js";
import followUser from "./followUser.js";
import groupDetail from "./groupDetail.js";
import createPersistedState from "vuex-persistedstate";
import groupChat from "./groupChat.js";

// import userLogin from "./userLogin.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login_user: null,
    userNum: null,
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
  getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    getUserbyUserNum: (state) => (id) =>
      state.sUser.usersData.find((user) => user.userNum === id),
    getUserPhotobyUserNum: (state) => (id) =>
      state.uDetail.userPhoto.find((photo) => photo.userNum === id),
    getFollowUserPost: (state) => (id) =>
      state.fUser.myfollows_users.find((follow) => follow.userNum === id),
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
  plugins: [
    createPersistedState({
      // ストレージのキーを指定。デフォルトではvuex
      key: "reviewPost",

      // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
      paths: [
        "rForm.current",
        "uDetail.userInformation.userName",
        "uDetail.userPhoto",
        "sUser.usersData",
        "uDetail.userInformation",
        "fUser.myfollowers_users",
        "fUser.myfollows_users;",
      ],

      // ストレージの種類を指定する。デフォルトではローカルストレージ
      storage: window.sessionStorage,
    }),
  ],

  modules: {
    rForm: reviewFrom,
    uDetail: userDetail,
    sUser: showUser,
    fUser: followUser,
    gDetail: groupDetail,
    gChat: groupChat,
  },
});

export default store;
