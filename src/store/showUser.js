import axios from "axios";

const showDetail = {
  state: {
    usersData: [],
  },
  getters: {},
  mutations: {
    getUserInfo(state, users) {
      for (let u of users) {
        if (u.hireDate !== null) {
          state.usersData.push(u);
        }
      }
    },
  },
  actions: {
    async getUserInfo({ rootState, getters, commit }, userNum) {
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
