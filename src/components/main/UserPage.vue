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
        <v-form v-if="this.$route.params.user_id !== this.$store.state.userNum">
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
        </v-form>
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

    <v-tabs centered grow v-model="title">
      <v-tab v-for="tab in tabs" :key="tab.title">{{ tab.title }} </v-tab>
    </v-tabs>

    <v-tabs-items v-model="title">
      <v-tab-item v-for="tab in tabs" :key="tab.title">
        <div v-if="tab.title === '投稿'">
          <div v-for="(info, index) in infos" :key="index">
            <PostComponents :info="info" />
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import axios from "axios";
import PostComponents from "../post/PostComponents.vue";
export default {
  data() {
    return {
      title: null,
      userInfo: [],
      infos: [],
      tabs: [
        {
          title: "投稿",
        },
        {
          title: "お気に入り",
        },
        {
          title: "いいね",
        },
      ],
    };
  },

  components: {
    PostComponents,
  },
  async created() {
    // console.log("パラメーター＝" + this.$route.params.user_id);
    // console.log("ユーザーID＝" + this.$store.state.userNum);
    if (this.$route.params.user_id === this.$store.state.userNum) {
      this.userInfo = this.$store.state.uDetail.userInformation;
    } else {
      const user = this.$store.getters.getUserbyUserNum(
        this.$route.params.user_id
      );

      this.userInfo = user;

      firebase.auth().onAuthStateChanged(async (user) => {
        user = user ? user : {};
        this.$store.commit("onAuthStatusChanged", user.uid ? true : false);
        await this.myFollows();
        await this.myFollowers();
      });
    }

    console.log("リクエストパラメーター＝" + this.$route.params.user_id);
    await this.reflesh();
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
    async reflesh() {
      console.log(this.$route.params.user_id);
      await axios
        .get("http://localhost:8080/getMyPosts", {
          params: {
            userNum: this.$route.params.user_id,
          },
        })
        .then((response) => {
          this.infos = response.data.reviewAllList;
        })
        .catch((e) => console.log(e.message));
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