<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  async created() {
    // if (this.$store.state.login_user) {
    //   if (this.$router.currentRoute.name === "Signin") {
    //     console.log("ユーザー詳細画面でのuserID =" + this.$store.state.userId);
    //     await this.findByUserId("111");
    //     console.log(this.$store.state.uDetail.userInformation);
    //     if (this.$store.state.uDetail.userInformation !== null) {
    //       this.$router.push("/home");
    //     } else {
    //       this.$router.push("/userDetail");
    //     }
    //   }
    // } else {
    //   this.deleteLoginUser();
    //   this.$router.push({ name: "Signin" }, () => {});
    // }
    // await firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log("userid=" + user.uid);
    //     this.setLoginUser(user);
    //     this.setUserId(user.uid);
    //     this.userId = this.$store.state.userId;
    //     console.log("userId = " + this.$store.state.userId);
    //     if (this.$router.currentRoute.name === "Signin") {
    //       this.$router.push({ name: "home" }, () => {});
    //     }
    //   } else {
    //     this.deleteLoginUser();
    //     this.$router.push({ name: "Signin" }, () => {});
    //   }
    // });
  },

  methods: {
    ...mapActions(["findByUserId", "deleteLoginUser"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>