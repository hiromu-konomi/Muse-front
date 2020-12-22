<template>
  <div>
    <!-- fontawsomeのCDN -->
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <i
      class="far fa-check-square"
      @click="clickCheck"
      :class="{ 'check-green' : isGreen }"
      >
      <span class="count">{{ checkCount }}</span>
      <p>Check Music</p>
    </i>
  </div>
</template>

<script>
import axios from "axios";
export default {
props: ['postId', 'countCheck', 'checkStatus'],
  data () {
    return {
      checkCount: 0,
      isGreen: false
    }
  },
  created(){
      this.isGreen = this.checkStatus;
      this.checkCount = this.countCheck;
  },
  methods: {
    async clickCheck () {
      if (this.isGreen) {
        this.checkCount = this.checkCount - 1
        this.isGreen = false
        await axios.get("http://localhost:8080/notCheck",{
            params: {
                postId: this.postId,
                userNum: this.$store.state.userNum,
            }
        })
      } else {
        this.checkCount = this.checkCount + 1
        this.isGreen = true
        await axios.get("http://localhost:8080/check",{
            params: {
                postId: this.postId,
                userNum: this.$store.state.userNum,
            }
        })
      }
    }
  }
}
</script>

<style>
  .fa-check-square {
    font-size: 20px;
    margin-left: 35px;
    color: #5F5B5B;
    position: absolute;
    top: 90px;
    left: -150px;
    text-align: left;
  }

   /* .count {
    color: #5F5B5B;
  } */

  .check-green {
    color: green;
  }
</style>