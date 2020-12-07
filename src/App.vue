<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import firebase from "firebase";
import { mapActions } from "vuex";
import firebase from "firebase";
export default {
  async created() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
      if (this.$router.currentRoute.name === "Signin") {
        this.$router.push("/home");
      } else {
        this.$router.push("/userDetail");
      }
    } else {
      this.deleteLoginUser();
      this.$router.push({ name: "Signin" }, () => {});
    }
  },

  methods: {
    ...mapActions(["deleteLoginUser"]),
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