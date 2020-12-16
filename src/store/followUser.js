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
    },
  },
  actions: {
    async follow({ state }, detail_user) {
      console.log("フォローしたいユーザー =" + detail_user);
      const user = firebase.auth().currentUser;

      console.log("自分 = " + user);
      console.log(state.myfollows_users.length);
      console.log(state.myfollows_users);

      let followingUserNum = "";
      let followerUserNum = "";

      if (state.myfollows_users.length) {
        console.log("aaa");
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
        console.log("bbb");
        console.log(user.uid);
        console.log(detail_user.userNum);

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
          console.log("follow=" + followingUserNum);
          console.log("follower=" + followerUserNum);
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
      console.log("user=" + user.uid);
      await axios
        .get("http://localhost:8080/followingId", {
          params: {
            followingUserNum: user.uid,
          },
        })
        .then(async (response) => {
          let my_follow_users = [];
          console.log("response =" + response.data);

          for (let u of response.data) {
            my_follow_users.push(u);
          }

          console.log(my_follow_users);
          console.log("my_follow_users.length=" + my_follow_users.length);
          commit("myFollows", my_follow_users);
          // for (let u of response.data) {
          //   console.log("u=" + u.followerUserNum);
          //   await axios
          //     .get("http://localhost:8080/followUser", {
          //       params: {
          //         userNum: u.followerUserNum,
          //       },
          //     })
          //     .then((res) => {
          //       for (let r of res.data) {
          //         my_follow_users.push(r);
          //       }

          //       console.log(my_follow_users);
          //       console.log("my_follow_users.length=" + my_follow_users.length);
          //       commit("myFollows", my_follow_users);
          //     })
          //     .catch((e) => console.log(e.message));
          // }
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

          console.log("フォロワー=" + my_follower_users);

          commit("myFollowers", my_follower_users);
          // for (let u of response.data) {
          //   await axios
          //     .get("http://localhost:8080/followUser", {
          //       params: {
          //         userNum: u.followingUserNum,
          //       },
          //     })
          //     .then((res) => {
          //       for (let r of res.data) {
          //         for (let m of my_follower_users) {
          //           if (r.userNum !== m.followingUserNum)
          //             my_follower_users.push(r);
          //         }
          //       }
          //     })
          //     .catch((e) => console.log(e.message));
          // }
        })
        .catch((error) => console.log(error.message));
    },
  },
};

export default followUser;
