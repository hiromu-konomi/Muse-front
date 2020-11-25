import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    sendEmail() {
      const actionCodeSettings = {
        url: "http://" + window.location.host + "/signin",
      };
      firebase.auth().languageCode = "ja";
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification(actionCodeSettings)
        .then(function() {
          alert("認証メールを送信しました");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
