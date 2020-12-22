<template>
  <v-card flat outlined max-width="700" height="420" class="mt-3">
    <v-card-title>
      <v-list-item class="pl-0">
        <router-link :to="{ name: 'userpage', params: { user_id: userNum } }">
          <v-list-item-avatar color="grey" size="40">
            <v-img :src="tweet.user.avatarUrl" />
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <v-list-item-title>
            {{ tweet.user.userName }}
          </v-list-item-title>
          <v-spacer></v-spacer>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>

    <v-row>
      <v-col cols="4">
        <v-card-text class="text--primary">
          {{ tweet.postText }}
        </v-card-text>
      </v-col>

      <v-col class="music" cols="4">
        <ul>
          <li><v-img :src="tweet.musicImage" /></li>
          <li>{{ tweet.artistName }}</li>
          <li>{{ tweet.musicName }}</li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <good-button
          :postId="postId"
          :countNum="countNum"
          :likeStatus="likeStatus"
        ></good-button>
        <check-button
          :postId="postId"
          :countCheck="checkCount"
          :checkStatus="checkStatus"
        ></check-button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import GoodButton from "./HeartButton";
import CheckButton from "./CheckButton";
export default {
  components: {
    "good-button": GoodButton,
    "check-button": CheckButton,
  },
  data() {
    return {
      userNum: "",
      postId: "",
      countNum: this.info.likeCount,
      likeStatus: this.info.likeStatus,
      checkCount: this.info.checkCount,
      checkStatus: this.info.checkStatus,
      tweet: {
        artistName: "",
        musicName: "",
        musicImage: "",
        postText: "",
        user: {
          userName: "",
          avatarUrl: this.info.photo,
        },
      },
    };
  },
  props: ["info"],
  created: async function () {
    // this.$router.go({path: this.$router.currentRoute.path, force: true})
    this.userNum = this.info.userNum;
    await this.refresh(this.userNum);
    this.tweet.user.userName = this.info.userName;
    this.tweet.artistName = this.info.artistName;
    this.tweet.musicName = this.info.musicName;
    this.tweet.musicImage = this.info.musicImage;
    this.tweet.postText = this.info.postText;
    this.postId = this.info.postId;
    console.log("postComponentsのcountNum=" + this.countNum);
  },
  methods: {
    ...mapActions(["refresh"]),
  },
};
</script>

<style>
.music {
  display: flex-end;
  flex-direction: column;
}

ul li {
  list-style: none;
}
</style>
