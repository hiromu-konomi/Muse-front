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
        <div class="text">
          <v-btn color="teal lighten-3" @click="Home">Home</v-btn>
        </div>
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

    for (let u of this.userPhoto) {
      let user = this.$store.getters.getUserbyUserNum(u.userNum);

      if (user) {
        user.photo = u.downloadURL;
        this.users.push(user);
      }
    }
  },

  methods: {
    Home() {
      this.$router.push("/home");
    },
    ...mapActions(["getUserInfo", "showUserPhoto"]),
  },
};
</script>


<style scoped>
.text {
  margin-top: 30px;
}
</style>
