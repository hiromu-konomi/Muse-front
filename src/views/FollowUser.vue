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
      userPhoto: "",
    };
  },

  async created() {
    this.userPhoto = this.$store.state.uDetail.userPhoto;
    console.log("photo=" + this.$store.state.uDetail.userPhoto);

    for (let u of this.userPhoto) {
      console.log(u.downloadURL);
      let user = this.$store.getters.getUserbyUserNum(u.userNum);
      if (user !== null) {
        user.photo = u.downloadURL;
        this.users.push(user);
      }
    }

    // for (let u of this.userDetail) {
    //   console.log("1");
    //   for (let p of this.userPhoto) {
    //     console.log("2");
    //     if (u.userNum === p.userNum) {
    //       console.log("3");
    //       u.photo = await p.downloadURL;
    //       this.users = await u;
    //     }
    //   }
    // }

    // for (let up of this.userPhoto) {
    //   console.log("1");
    //   for (let ud of this.userDetail) {
    //     console.log("2");
    //     if (up.userNum === ud.userNum) {
    //       console.log("3");
    //       this.img = up.downloadURL;
    //       this.users = Object.assign({}, ud, this.img);
    //       console.log("ユーザー=" + this.users.img);
    //     }
    //   }
    // }
  },

  methods: {
    ...mapActions(["getUserInfo", "showUserPhoto"]),
  },
};
</script>

<style scoped>
/* .user {
  border: solid 1px grey;
} */
</style>
