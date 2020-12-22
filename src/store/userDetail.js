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
    // async addUserPhoto(state, photo) {
    //   console.log(photo);
    //   state.userPhoto = await photo;
    // },
    updateUserDetail(state, { userNum, user }) {
      user.userNum = userNum;
      state.userInformation = user;
    },
    // addPhoto(state, { id, userPhoto }) {
    //   userPhoto.id = id;
    //   state.userPhoto = userPhoto;
    // },
    showUserPhoto(state, photo) {
      console.log("p=" + photo);
      state.userPhoto.push(photo);
    },
  },
  actions: {
    async findByUserId({ commit }, userNum) {
      await axios
        .get("http://localhost:8080/users", {
          params: {
            userNum: userNum,
          },
        })
        .then((response) => {
          commit("getUserDetail", response.data);
        })
        .catch((reason) => console.log(reason));
    },

    async addUserDetail({ commit }, user) {
      await axios
        .post("http://localhost:8080/userDetail", user)
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
    // async updateUserDetail({ commit }, { userNum, user }) {
    //   console.log("userNum=" + userNum);
    //   console.log("user=" + user.photo);
    //   await axios
    //     .put("http://localhost:8080/userDetail/" + userNum, user)
    //     .then(commit("updateUserDetail", { userNum, user }))
    //     .catch((e) => console.log(e.message));
    // },
    // addUserPhoto({ getters, commit }, photo) {
    //   if (getters.uid) {
    //     firebase
    //       .firestore()
    //       .collection(`users/${getters.uid}/userDetail`)
    //       .add(photo)
    //       .then((doc) => {
    //         id: doc.id, photo;
    //       });
    //   }
    // },
  },
};

export default userDetail;
