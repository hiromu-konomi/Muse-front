<template>
  <div>
    <div>
      <v-card color="#ADD8E6" dark tile>
        <v-card-text>
          <v-layout wrap justify-center>
            <h1 class="white--text">Home</h1>
          </v-layout>
        </v-card-text>
      </v-card>
      <div v-for="info in infos" :key="info.postId">
        <PostComponents :info="info" @deleteInfo="deleteInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import PostComponents from "../post/PostComponents.vue";
import axios from "axios";

export default {
  data() {
    return {
      userNum: "",
      infos: [],
    };
  },
  components: {
    PostComponents,
  },
  methods: {
    async reflesh() {
      const rev = await axios.get(
        "http://localhost:8080/getMusicInfoAndReview",
        {
          params: {
            userNum: this.uid,
          },
        }
      );

      let followPosts = rev.data.reviewAllList;
      let followPostList = [];

      for (let f of followPosts) {
        let followPhtoto = this.$store.getters.getUserPhotobyUserNum(f.userNum);
        f.photo = followPhtoto.downloadURL;
        followPostList.push(f);
      }

      this.infos = followPostList;
    },
  },

    deleteInfo() {
      this.reflesh();
      // await console.log(this.infos);
      // await this.$nextTick();
    },

    computed: {
      uid() {
        return this.$store.getters.uid;
      },
    },
    watch: {
      async uid() {
        this.reflesh();
      },
    },
    created() {
      this.reflesh();
    },
};
</script>

<style scoped>
h1 {
  font-family: "メイリオ";
}
</style>
