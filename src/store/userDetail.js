import axios from "axios";
import firebase from "firebase";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const userDetail = {
  state: {
    userInformation: "",
    userPhoto: [],
  },
  getters: {},
  mutations: {
    getUserDetail(state, userInformation) {
      state.userInformation = userInformation;
    },
    updateUserDetail(state, { userNum, user }) {
      user.userNum = userNum;
      state.userInformation = user;
    },
    showUserPhoto(state, photo) {
      if (
        !state.userPhoto.find(
          (userPhoto) => userPhoto.userNum === photo.userNum
        )
      ) {
        state.userPhoto.push(photo);
      }
    },
  },

  actions: {
    async findByUserId({ rootState, commit }, userNum) {
      await axios
        .get(rootState.baseUrl + "/users", {
          params: {
            userNum: userNum,
          },
        })
        .then((response) => {
          commit("getUserDetail", response.data);
        })
        .catch((reason) => console.log(reason));
    },

    async addUserDetail({ rootState, commit }, user) {
      await axios
        .post(rootState.baseUrl + "/userDetail", user)
        .then(commit("getUserDetail", user))
        .catch((reason) => console.log(reason));
    },

    async addUserPhoto({ getters }, photo) {
      if (getters.uid) {
        const uploadFile = photo;
        const storageRef = firebase.storage().ref();

        const uploadTask = storageRef.child(`images/${uploadFile.name}`);
        await uploadTask
          .put(uploadFile)
          .then((snapshot) => {
            snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                const userNum = getters.uid;
                firebase
                  .firestore()
                  .collection("users")
                  .add({
                    userNum,
                    downloadURL,
                  })
                  .then((doc) => {
                    // commit("addPhoto", { id: doc.id, downloadURL });
                    console.log(doc.id);
                  });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    showUserPhoto({ commit }) {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            commit("showUserPhoto", doc.data());
          });
        });
    },
  },
};

export default userDetail;
