<template>
  <div>
    <!-- fontawsomeのCDN -->
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <i
      class="far fa-heart"
      @click="clickHeart"
      :class="{ 'heart-red' : isActive }"
      >
      <span class="count">{{ goodArticleCount }}</span>
    </i>
  </div>
</template>

<script>
import axios from "axios";
export default {
 props: ['postId', 'countNum', 'likeStatus'],

  data () {
    return {
      goodArticleCount: 0,
      isActive: false
    }
  },
  async created(){
    this.postId = String(this.postId);
    this.isActive = this.likeStatus;
    console.log("isActive="+this.isActive)
    this.goodArticleCount = this.countNum;
    console.log("newCount="+this.goodArticleCount)
  },
  methods: {
      async clickHeart () {
        if (this.isActive) {
        this.goodArticleCount = this.goodArticleCount - 1
        this.isActive = false
        console.log("ハートボタンコンポーネントのpostId="+this.postId)
        await axios.get("http://localhost:8080/notLike",{
            params: {
                postId: this.postId,
            }
        })
      } else {
        this.goodArticleCount = this.goodArticleCount + 1
        this.isActive = true
        this.postId = Number(this.postId);
        console.log("ハートボタンコンポーネントのpostId="+this.postId)
        await axios.get("http://localhost:8080/like",{
            params: {
                postId: this.postId,
                userNum: this.$store.state.userNum,
            }
        })
            // this.goodArticleCount = rev.data
            // console.log(this.goodArticleCount);
            console.log("いいね追加");
      }
    }
  }
}
</script>

<style>
  .fa-heart {
    font-size: 20px;
    margin-left: 35px;
    color: #5F5B5B;
    position: left;
    top: 150px;
    left: 700px;
  }

   .count {
    color: #5F5B5B;
  }

  .heart-red {
    color: red;
  }
</style>
