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
      console.log("stateUser=" + state.usersData);
    },
  },
  actions: {
    async getUserInfo({ getters, commit }, userNum) {
      console.log("userNum=" + userNum);
      console.log(getters.uid);
      if (getters.uid) {
        await axios
          .get("http://localhost:8080/userInfo", {
            params: {
              userNum: userNum,
            },
          })
          .then((response) => {
            console.log("aaaa");
            console.log("resData=", response.data);
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
