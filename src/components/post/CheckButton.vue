<template>
  <div>
    <!-- fontawsomeのCDN -->
    <link
      href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
      rel="stylesheet"
    />
    <i
      class="far fa-check-square"
      @click="clickCheck"
      :class="{ 'check-green': isGreen }"
    >
      <span class="count">{{ checkCount }}</span>
    </i>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["postId", "countCheck", "checkStatus"],
  data() {
    return {
      checkCount: 0,
      isGreen: false,
    };
  },
  async created() {
    // this.postId = String(this.postId);
    this.isGreen = this.checkStatus;
    console.log("checkStatus=" + this.isGreen);
    this.checkCount = this.countCheck;
    console.log("checkCount=" + this.checkCount);
  },
  methods: {
    async clickCheck() {
      if (this.isGreen) {
        this.checkCount = this.checkCount - 1;
        this.isGreen = false;
        console.log("チェックボタンコンポーネントのpost_id=" + this.postId);
        await axios.get("http://localhost:8080/notCheck", {
          params: {
            postId: this.postId,
            userNum: this.$store.state.userNum,
          },
        });
      } else {
        this.checkCount = this.checkCount + 1;
        this.isGreen = true;
        // this.postId = Number(this.postId);
        console.log("チェックボタンコンポーネントのpostId=" + this.postId);
        await axios.get("http://localhost:8080/check", {
          params: {
            postId: this.postId,
            userNum: this.$store.state.userNum,
          },
        });
        console.log("チェック完了");
      }
    },
  },
};
</script>

<style>
.fa-check-square {
  font-size: 20px;
  margin-left: 35px;
  color: #5f5b5b;
  top: 150px;
  left: 700px;
}

.count {
  color: #5f5b5b;
}

.check-green {
  color: green;
}
</style>