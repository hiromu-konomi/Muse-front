<template>
  <div>
    <SideNav />
    <router-view />
    <SideSearch />
  </div>
</template>

<script>
import SideNav from "../components/side/SideNav.vue";
import SideSearch from "../components/side/SideSearch.vue";
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userId: "",
    };
  },
  components: {
    SideNav,
    SideSearch,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("userid=" + user.uid);
        this.setLoginUser(user);
        this.setUserId(user.uid);

        this.userId = this.$store.state.userId;
        console.log("userId = " + this.$store.state.userId);

        if (this.$router.currentRoute.name === "/signin") {
          this.$router.push({ name: "home" }, () => {});
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "/signin" }, () => {});
      }
    });
  },
  methods: {
    ...mapActions(["setLoginUser", "deleteLoginUser", "setUserId"]),
  },
};
</script>