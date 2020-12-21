import axios from "axios";

import firebase from "firebase";

const followUser = {
  state: {
    status: false,
    myfollows_users: [],
    myfollowers_users: [],
  },
  getters: {},
  mutations: {
    onAuthStatusChanged(state, status) {
      state.status = status;
    },
    myFollows(state, my_follow_users) {
      state.myfollows_users = my_follow_users;
    },
    myFollowers(state, my_follower_users) {
      state.myfollowers_users = my_follower_users;
      console.log("フォロワー＝" + state.myfollowers_users);
    },
  },
  actions: {
    async follow({ state }, detail_user) {
      const user = firebase.auth().currentUser;

      console.log("自分 = " + user);
      console.log(state.myfollows_users.length);
      console.log(state.myfollows_users);

      let followingUserNum = "";
      let followerUserNum = "";

      if (state.myfollows_users.length) {
        state.myfollows_users.forEach(async (element) => {
          if (detail_user.userNum !== element.userNum) {
            followingUserNum = user.uid;
            followerUserNum = detail_user.userNum;
          }
        });
        await axios
          .post("http://localhost:8080/follow", {
            followingUserNum: followingUserNum,
            followerUserNum: followerUserNum,
          })
          .then(() => {
            console.log("フォロ-完了");
          })
          .catch((e) => console.log(e.message));
      } else {
        await axios
          .post("http://localhost:8080/follow", {
            followingUserNum: user.uid,
            followerUserNum: detail_user.userNum,
          })
          .then(() => {
            console.log("フォロ-完了");
          })
          .catch((e) => console.log(e.message));
      }
    },
    async unFollow({ state }, detail_user) {
      console.log(detail_user);
      const user = firebase.auth().currentUser;
      let followingUserNum = "";
      let followerUserNum = "";
      if (state.myfollows_users.length) {
        state.myfollows_users.forEach(async (element) => {
          if (detail_user.userNum === element.userNum) {
            followingUserNum = user.uid;
            followerUserNum = detail_user.userNum;
          }
        });
        await axios
          .delete("http://localhost:8080/deletefollowUser", {
            params: {
              followingUserNum: followingUserNum,
              followerUserNum: followerUserNum,
            },
          })
          .then(() => {
            console.log("フォロー解除");
          })
          .catch((e) => console.log(e.message));
      }
    },
    async myFollows({ commit }) {
      const user = firebase.auth().currentUser;

      await axios
        .get("http://localhost:8080/followingId", {
          params: {
            followingUserNum: user.uid,
          },
        })
        .then(async (response) => {
          let my_follow_users = [];

          for (let u of response.data) {
            my_follow_users.push(u);
          }

          commit("myFollows", my_follow_users);
        })
        .catch((error) => console.log(error.message));
    },

    async myFollowers({ commit }) {
      const user = firebase.auth().currentUser;

      await axios
        .get("http://localhost:8080/followerId", {
          params: {
            followerUserNum: user.uid,
          },
        })
        .then(async (response) => {
          let my_follower_users = [];

          for (let u of response.data) {
            my_follower_users.push(u);
          }

          commit("myFollowers", my_follower_users);
        })
        .catch((error) => console.log(error.message));
    },
  },
};

export default followUser;
