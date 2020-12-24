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
    console.log(this.$route.params.follower_id);
    await this.myFollowers(this.$route.params.follower_id);
    let followersPhoto = this.$store.state.fUser.myfollowers_users;
    let followerList = [];
    for (let f of followersPhoto) {
      if (f !== null) {
        console.log(f.userNum);
        let followerUserPhoto = this.$store.getters.getUserPhotobyUserNum(
          f.userNum
        );
        f.photo = followerUserPhoto.downloadURL;
        followerList.push(f);
      }
    }
    this.followers = followerList;
  },
  computed: {
    param() {
      return this.$route.params.follower_id;
    },
  },
  watch: {
    param() {
      this.myFollowers(this.$route.params.follower_id);
    },
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
