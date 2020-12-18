<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center">
          <v-toolbar-title> おすすめユーザー </v-toolbar-title>
          <v-card-text>
            <RecommendUser
              v-for="user of users"
              :key="user.userNum"
              :user="user"
              class="user"
            >
            </RecommendUser>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import RecommendUser from "../components/Info/RecommendUser.vue";

export default {
  components: { RecommendUser },

  data() {
    return {
      users: [],
    };
  },

  created() {
    console.log("おすすめユーザー" + this.$store.state.sUser.usersData);
    this.users = this.$store.state.sUser.usersData;
    for (let u of this.users) {
      console.log("画像＝" + u.photo);
      console.log("ユーザー情報 =" + u);
    }
  },

  methods: {
    ...mapActions(["getUserInfo"]),
  },
};
</script>

<style scoped>
/* .user {
  border: solid 1px grey;
} */
</style>
