<template>
  <div>
    <v-text-field
      class="search"
      v-model="search_user"
      type="text"
    >
      <template v-slot:append>
        <v-icon type="button" @click="search">mdi-magnify</v-icon>
      </template>
    </v-text-field>
    <div v-if="this.count === 1">
      <v-list v-if="exploreUserResult.length">
        <template v-for="(user, index) in exploreUserResult">
          <v-list-item
            :key="user.userId"
            :to="{ name: 'userpage',
            params: { user_id: user.userNum }
            }"
          >
            <v-list-item-avatar>
              <v-img :src="user.photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h3>{{ user.userName }}</h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider :key="`second-${index}`"></v-divider>
        </template>
      </v-list>
      <v-list v-else>
            <h1 style="color:#AAAAAA;">検索結果はありません</h1>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search_user: '',
      exploreUserResult: [],
      count: '',
    }
  },
  methods: {
    async search() {
      const res = await axios.get('http://localhost:8080/searchUsers', {
        params: {
          searchUser: this.search_user
        }
      })
      let user = res.data;
      let userData = [];
      for(let data of user){
        let userPhoto = this.$store.getters.getUserPhotobyUserNum(data.userNum);
        data.photo = userPhoto.downloadURL;
        userData.push(data);
      }
      this.exploreUserResult = userData;
      this.count = 1;
    },
    }
  }
</script>

<style scoped>

</style>