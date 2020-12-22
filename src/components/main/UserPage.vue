<template>
  <div class="text-center">
    <v-avatar size="150">
      <v-img :src="userInfo.photo"></v-img>
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
    </v-row>
    <v-row>
      <v-col>
        {{ userInfo.depName }}
      </v-col>
      <v-col> {{ userInfo.profile }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link
          :to="{ name: 'follows', params: { follow_id: userInfo.userNum } }"
          >{{ this.follows }} フォロー</router-link
        ></v-col
      >
      <v-col>
        <router-link
          :to="{ name: 'followers', params: { follower_id: userInfo.userNum } }"
          >{{ this.followers }} フォロワー</router-link
        ></v-col
      >
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
        <div v-if="tab.title === 'いいね'">
          <div v-for="(info, index) in likeposts" :key="index">
            <LikePostComponents :info="info" />
          </div>
        </div>
        <div v-if="tab.title === 'お気に入り'">
          <div v-for="(info, index) in checkSongs" :key="index">
            <CheckSongComponents :info="info" />
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import firebase from "firebase";
import axios from "axios";
import PostComponents from "../post/PostComponents.vue";
import LikePostComponents from "../post/LikePostComponents.vue";
import CheckSongComponents from "../post/CheckSongComponents.vue";
export default {
  data() {
    return {
      title: null,
      userInfo: [],
      infos: [],
      likeposts: [],
      checkSongs: [],
      follows: "",
      followers: "",
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
    LikePostComponents,
    CheckSongComponents,
  },
  async created() {
    if (this.$route.params.user_id === this.$store.state.userNum) {
      let myphoto = this.$store.getters.getUserPhotobyUserNum(
        this.$store.state.userNum
      );
      let myUser = this.$store.state.uDetail.userInformation;

      myUser.photo = myphoto.downloadURL;
      this.userInfo = myUser;
    } else {
      let user = this.$store.getters.getUserbyUserNum(
        this.$route.params.user_id
      );
      let photo = this.$store.getters.getUserPhotobyUserNum(
        this.$route.params.user_id
      );

      user.photo = photo.downloadURL;

      this.userInfo = user;
    }
    await this.myFollows(this.userInfo.userNum);
    await this.myFollowers(this.userInfo.userNum);
    await this.myChengeFollowStatus();
    await this.reflesh();
    await this.getLikePosts();
    await this.getCheckSongs();

    this.follows = this.$store.state.fUser.myfollows_users.length;
    this.followers = this.$store.state.fUser.myfollowers_users.length;
  },
  computed: {
    detailUser() {
      let array = this.$store.state.fUser.change_myfollow_status;

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

      return check_user;
    },
  },
  methods: {
    async followUser(user) {
      await this.follow(user);
    },

    async unFollowUser(user) {
      await this.unFollow(user);
    },
    async reflesh() {
      await axios
        .get("http://localhost:8080/getMyPosts", {
          params: {
            userNum: this.$route.params.user_id,
          },
        })
        .then((response) => {
          let myposts = response.data.reviewAllList;
          let mypostList = [];

          for (let m of myposts) {
            let myPostPhoto = this.$store.getters.getUserPhotobyUserNum(
              m.userNum
            );
            m.photo = myPostPhoto.downloadURL;

            mypostList.push(m);
          }
          this.infos = mypostList;
        })
        .catch((e) => console.log(e.message));
    },
    async getLikePosts() {
      await axios
        .get("http://localhost:8080/getLikePosts", {
          params: {
            userNum: this.$route.params.user_id,
          },
        })
        .then((response) => {
          let likes = response.data.reviewAllList;
          let likeList = [];
          for (let l of likes) {
            let usersPostPhoto = this.$store.getters.getUserPhotobyUserNum(
              l.userNum
            );
            l.photo = usersPostPhoto.downloadURL;
            likeList.push(l);
          }
          this.likeposts = likeList;
        })
        .catch((e) => console.log(e.message));
    },
    async getCheckSongs() {
      await axios
        .get("http://localhost:8080/getCheckSongs", {
          params: {
            userNum: this.$route.params.user_id,
          },
        })
        .then((response) => {
          this.checkSongs = response.data.checkAllList;
        })
        .catch((e) => console.log(e.message));
    },
    ...mapActions([
      "follow",
      "myFollows",
      "myFollowers",
      "unFollow",
      "myChengeFollowStatus",
    ]),
  },
};
</script>

<style scoped>
.userName {
  font-size: 30px;
}
</style>