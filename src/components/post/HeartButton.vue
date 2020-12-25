<template>
  <div>
    <!-- fontawsomeのCDN -->
    <link
      href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
      rel="stylesheet"
    />
    <i
      class="far fa-heart"
      @click="clickHeart"
      :class="{ 'heart-red': isActive }"
    >
      <span>{{ goodArticleCount }}</span>
    </i>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["postId", "countNum", "likeStatus"],

  data() {
    return {
      goodArticleCount: 0,
      isActive: false,
    };
  },
  async created() {
    this.postId = String(this.postId);
    this.isActive = this.likeStatus;
    this.goodArticleCount = this.countNum;
  },
  methods: {
    async clickHeart() {
      if (this.isActive) {
        this.goodArticleCount = this.goodArticleCount - 1;
        this.isActive = false;
        await axios.get(this.$store.state.baseUrl + "/notLike", {
          params: {
            postId: this.postId,
            userNum: this.$store.state.userNum,
          },
        });
      } else {
        this.goodArticleCount = this.goodArticleCount + 1;
        this.isActive = true;
        this.postId = Number(this.postId);
        await axios.get(this.$store.state.baseUrl + "/like", {
          params: {
            postId: this.postId,
            userNum: this.$store.state.userNum,
          },
        });
        // this.goodArticleCount = rev.data
        // console.log(this.goodArticleCount);
      }
    },
  },
};
</script>

<style>
.fa-heart {
  font-size: 20px;
  margin-left: 35px;
  color: #5f5b5b;
  position: absolute;
  top: 0px;
  left: 50px;
}

/* .count {
    color: #5F5B5B;
  } */

.heart-red {
  color: red;
}
</style>
