import axios from "axios";
import firebase from "firebase";

const userDetail = {
  state: {
    userInformation: "",
    userPhoto: null,
  },
  getters: {},
  mutations: {
    getUserDetail(state, userInformation) {
      console.log("getUserDetail = " + userInformation);
      state.userInformation = userInformation;
    },
    addUserPhoto(state, photo) {
      console.log(photo);
      state.photo = photo;
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
          console.log("response=" + response.data);
          commit("getUserDetail", response.data);
        })
        .catch((reason) => console.log(reason));
    },

    async addUserDetail({ commit }, user) {
      console.log("storeに渡されたユーザー情報=" + user);
      await axios
        .post("http://localhost:8080/userDetail", user)
        .then(commit("getUserDetail", user))
        .catch((reason) => console.log(reason));
    },

    addUserPhoto({ getters, commit }, photo) {
      if (getters.uid) {
        const uploadFile = photo;
        const storageRef = firebase.storage().ref();

        const uploadTask = storageRef.child(`images/${uploadFile.name}`);
        uploadTask
          .put(uploadFile)
          .then((snapshot) => {
            snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                console.log("ダウンロードURL =" + downloadURL);
                commit("addUserPhoto", downloadURL);
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
