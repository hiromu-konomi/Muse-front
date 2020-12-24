import axios from "axios";

const showDetail = {
  state: {
    usersData: [],
  },
  getters: {
    // getUserbyUserNum: (state) => (id) =>
    //   state.usersDate.find((user) => user.userNum === id),
  },
  mutations: {
    getUserInfo(state, users) {
      console.log(users);
      for (let u of users) {
        if (u.hireDate !== null) {
          state.usersData.push(u);
        }
      }
    },
  },
  actions: {
    async getUserInfo({ rootState, getters, commit }, userNum) {
      console.log("userNum=" + userNum);
      console.log(getters.uid);
      if (getters.uid) {
        await axios
          .get(rootState.baseUrl + "/userInfo", {
            params: {
              userNum: userNum,
            },
          })
          .then((response) => {
            commit("getUserInfo", response.data);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    },
  },
};

export default showDetail;
