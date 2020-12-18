<template>
  <v-card flat outlined max-width="700" height="420" class="mt-3">
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
        <!-- <check-button
          :postId="postId"
          :countCheck="checkCount"
          :checkStatus="checkStatus"
        ></check-button> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import CheckButton from "./CheckButton";
export default {
  //   components: {
  //     "check-button": CheckButton,
  //   },
  data() {
    return {
      postId: "",
      checkCount: this.info.checkCount,
      checkStatus: this.info.checkStatus,
      tweet: {
        artistName: "",
        musicName: "",
        musicImage: "",
        postText: "",
      },
    };
  },
  props: ["info"],
  created: async function () {
    this.tweet.artistName = this.info.artistName;
    this.tweet.musicName = this.info.musicName;
    this.tweet.musicImage = this.info.musicImage;
    this.postId = this.info.postId;
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
