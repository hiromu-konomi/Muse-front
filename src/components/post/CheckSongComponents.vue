<template>
  <v-card flat outlined max-width="700" height="200" class="mt-3">
    <v-list>
      <v-card-title>
        <v-list-item class="checkButton">
          <check-button
            :postId="postId"
            :countCheck="checkCount"
            :checkStatus="checkStatus"
          ></check-button>
        </v-list-item>
      </v-card-title>
    </v-list>

    <table>
      <tr>
        <th rowspan="2">
          <v-img :src="tweet.musicImage" />
        </th>
        <td class="artistName">
          {{ tweet.artistName }}
        </td>
      </tr>
      <td class="musicName">{{ tweet.musicName }}</td>
    </table>
  </v-card>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  components: {
    "check-button": CheckButton,
  },
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
