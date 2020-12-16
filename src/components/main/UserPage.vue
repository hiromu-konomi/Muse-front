<template>
  <div class="text-center">
    <v-avatar size="150">
      <v-img
        :src="'http://gahag.net/img/201602/25s/gahag-0059907781-1.jpg'"
      ></v-img>
    </v-avatar>
    <v-row>
      <v-col>
        {{ userInfo.userName }}
      </v-col>
      <v-col>
        <v-btn
          color="teal lighten-3"
          class="mx-0"
          v-if="!detailUser.follow_status"
          @click.prevent="followUser(detailUser)"
          >フォローする</v-btn
        >
        <v-btn
          color="teal lighten-3"
          class="mx-0"
          v-else
          @click.prevent="unFollowUser(detailUser)"
          >フォロー解除する</v-btn
        >
      </v-col>
      <!-- <v-col>
        {{ userInfo.depId }}
      </v-col> -->
    </v-row>
    <v-row>
      <v-col>
        {{ userInfo.depName }}
      </v-col>
      <v-col> {{ userInfo.profile }} </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      userInfo: [],
    };
  },

  async created() {
    const user = this.$store.getters.getUserbyUserNum(
      this.$route.params.user_id
    );
    console.log("リクエストパラメータ = " + this.$route.params.user_id);
    this.userInfo = user;

    firebase.auth().onAuthStateChanged(async (user) => {
      user = user ? user : {};
      this.$store.commit("onAuthStatusChanged", user.uid ? true : false);
      await this.myFollows();
      await this.myFollowers();
    });
  },
  computed: {
    detailUser() {
      let array = this.$store.state.fUser.myfollows_users;
      console.log("フォローユーザー情報=" + array);
      let check_user = this.userInfo;

      function checkAlreadyFollows(arry, id) {
        return arry.some(function (value) {
          return id === value.userNum;
        });
      }
      if (checkAlreadyFollows(array, check_user.userNum)) {
        check_user.follow_status = true;
      } else {
        check_user.follow_status = false;
      }

      this.$store.state.fUser.myfollows_users.forEach((user) => {
        if (user.userNum === check_user.userNum) {
          check_user.followed_status = true;
          Object.assign(check_user, check_user);
        }
      });

      console.log("チェックユーザー =" + check_user.follow_status);
      console.log(check_user.userName);
      return check_user;
    },
  },
  methods: {
    async followUser(user) {
      console.log("フォローするユーザー" + user);
      await this.follow(user);
    },

    async unFollowUser(user) {
      console.log("フォロー解除したいユーザー ＝" + user);
      await this.unFollow(user);
    },
    ...mapActions(["follow", "myFollows", "myFollowers", "unFollow"]),
  },
};
</script>

<style scoped>
.userName {
  font-size: 30px;
}
</style>