<template>
  <v-navigation-drawer permanent app>
    <v-list dense nav>
      <v-list-item :to="{ name: 'userpage', params: { user_id: userNum } }">
        <v-list-item-icon>
          <v-icon>mdi-emoticon</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mypage</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-layout row wrap justify-center>
      <v-flex class="text-center" xs8 mt-5>
        <v-row class="sideBtn">
          <v-btn color="#FFF0F5" block type="submit" to="/searchsong">
            <span class="font-weight-bold">+Add Post</span>
          </v-btn>
        </v-row>
        <v-row class="sideBtn">
          <v-btn color="#B0E0E6" block type="submit" to="/addGroup">
            <span class="font-weight-bold">+Add Group</span>
          </v-btn>
        </v-row>
        <v-row class="LogoutBtn" v-if="$store.getters.uid">
          <v-btn color="red accent-2" block type="submit" @click="logoutBtn">
            <span text class="font-weight-bold">Logout</span>
          </v-btn>
        </v-row>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", link: { name: "home" } },
        {
          title: "Notification",
          icon: "mdi-bell",
          link: { name: "FollowNotification" },
        },
        {
          title: "Group",
          icon: "mdi-human-greeting",
          link: { name: "OwnerGroupList" },
        },
        { title: "Explore", icon: "mdi-magnify", link: { name: "explore" } },
      ],
      right: null,
    };
  },
  computed: {
    userNum() {
      return this.$store.getters.uid;
    },
  },
  methods: {
    logoutBtn() {
      this.logout();
      this.deleteLoginUser();
      console.log("ログインユーザー＝", this.$store.state.login_user);
      if (this.$store.state.login_user === null) {
        this.$router.push({ name: "Signin" }, () => {});
      }
    },
    ...mapActions(["logout", "deleteLoginUser"]),
  },
};
</script>

<style scoped>
.sideBtn {
  margin-top: 20px;
}
.LogoutBtn {
  margin-top: 50px;
}
</style>