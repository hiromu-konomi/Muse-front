import axios from "axios";

import firebase from "firebase";

const followUser = {
  state: {
    status: false,
    myfollows_users: [],
    myfollowers_users: [],
    change_myfollow_status: [],
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
    },
    myChengeFollowStatus(state, my_follows) {
      state.change_myfollow_status = my_follows;
    },
  },
  actions: {
    async follow({ state, rootState }, detail_user) {
      const user = firebase.auth().currentUser;

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
          .post(rootState.baseUrl + "/follow", {
            followingUserNum: followingUserNum,
            followerUserNum: followerUserNum,
          })
          .then(() => {
            console.log("フォロ-完了");
          })
          .catch((e) => console.log(e.message));
      } else {
        await axios
          .post(rootState.baseUrl + "/follow", {
            followingUserNum: user.uid,
            followerUserNum: detail_user.userNum,
          })
          .then(() => {
            console.log("フォロ-完了");
          })
          .catch((e) => console.log(e.message));
      }
    },
    async unFollow({ rootState, state }, detail_user) {
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
          .delete(rootState.baseUrl + "/deletefollowUser", {
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
    async myFollows({ rootState, commit }, userNum) {
      // const user = firebase.auth().currentUser;

      await axios
        .get(rootState.baseUrl + "/followingId", {
          params: {
            followingUserNum: userNum,
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

    async myChengeFollowStatus({ rootState, commit }) {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          console.log("user=" + user);
          await axios
            .get(rootState.baseUrl + "/followingId", {
              params: {
                followingUserNum: user.uid,
              },
            })
            .then(async (response) => {
              let my_follows = [];

              for (let u of response.data) {
                my_follows.push(u);
              }

              commit("myChengeFollowStatus", my_follows);
            })
            .catch((error) => console.log(error.message));
        }
      });
    },

    async myFollowers({ rootState, commit }, userNum) {
      console.log("userNUm", userNum);
      await axios
        .get(rootState.baseUrl + "/followerId", {
          params: {
            followerUserNum: userNum,
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
