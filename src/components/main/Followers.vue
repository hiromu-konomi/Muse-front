<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6 mt-5>
        <v-card class="text-center">
          <v-toolbar-title> フォロワー </v-toolbar-title>
          <v-card-text>
            <RecommendUser
              v-for="user of followers"
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
import RecommendUser from "../Info/RecommendUser.vue";

export default {
  name: "Followers",
  components: { RecommendUser },

  data() {
    return {
      followers: [],
    };
  },

  async created() {
    await this.myFollowers();
    this.followers = this.$store.state.fUser.myfollowers_users;
  },

  methods: {
    ...mapActions(["myFollowers"]),
  },
};
</script>

<style scoped>
/* .user {
  border: solid 1px grey;
} */
</style>
