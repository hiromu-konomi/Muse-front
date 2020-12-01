const userDetail = {
  state: {
    userId: "",
  },
  getters: {},
  mutations: {
    // setUserId(state, userId) {
    //   state.userId = userId;
    //   console.log("state.userId=" + state.userId);
    // },
  },
  actions: {
    // fetchUserId({ getters, commit }) {
    //   console.log("getters.uid =" + getters.uid);
    //   if (getters.uid) {
    //     firebase
    //       .firestore()
    //       .collection(`users/${getters.uid}/userDetail`)
    //       .get()
    //       .then((snapshot) => {
    //         snapshot.forEach((doc) =>
    //           commit("getUserId", { payload: doc.data })
    //         );
    //       });
    //   }
    // },
    // setUserId({ commit }, userId) {
    //   console.log("userId=" + userId), commit("setUserId", userId);
    // },
  },
};

export default userDetail;
