<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6 mt-5>
        <v-card class="text-center">
          <v-toolbar-title> フォロー中 </v-toolbar-title>
          <v-card-text>
            <RecommendUser
              v-for="user of follows"
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
  name: "Follow",
  components: { RecommendUser },

  data() {
    return {
      follows: [],
    };
  },

  async created() {
    await this.myFollows(this.$route.params.follow_id);

    let followsPhoto = this.$store.state.fUser.myfollows_users;
    let followList = [];
    for (let f of followsPhoto) {
      let followUserPhoto = this.$store.getters.getUserPhotobyUserNum(
        f.userNum
      );
      f.photo = followUserPhoto.downloadURL;
      followList.push(f);
    }
    this.follows = followList;
  },
  computed: {
    param() {
      return this.$route.params.follow_id;
    },
  },
  watch: {
    param() {
      this.myFollows(this.$route.params.follow_id);
    },
  },
  methods: {
    ...mapActions(["myFollows"]),
  },
};
</script>

<style scoped>
/* .user {
  border: solid 1px grey;
} */
</style>
