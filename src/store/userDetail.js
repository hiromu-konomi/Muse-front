import axios from "axios";

const userDetail = {
  state: {
    userInformation: [],
  },
  getters: {},
  mutations: {
    getUserDetail(state, userInformation) {
      console.log("getUserDetail = " + userInformation);
      state.userInformation = userInformation;
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
      await axios
        .post("http://localhost:8080/userDetail", user)
        .then(commit("getUserDetail", user))
        .catch((reason) => console.log(reason));
    },
  },
};

export default userDetail;
