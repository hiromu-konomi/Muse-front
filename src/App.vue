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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.setLoginUser(user);

        await this.setUserId(user.uid);

        await this.showUserPhoto();
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "Signin" }, () => {});
      }
    });
  },

  methods: {
    ...mapActions([
      "deleteLoginUser",
      "setLoginUser",
      "setUserId",
      "showUserPhoto",
      "findByUserId",
    ]),
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
