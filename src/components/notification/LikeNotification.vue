<template>
  <div>
    <v-list v-if="likeNoti.length">
      <template v-for="(lkNoti, index) in likeNoti">
        <v-list-item
          :key="lkNoti.NotiId"
          :to="{ name: 'userpage',
          params: { user_id: lkNoti.userNum }
          }"
        >
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h3>{{ lkNoti.userName }}にいいねされました</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider :key="`second-${index}`"></v-divider>
      </template>
    </v-list>
    <v-card v-else>
      <v-card-text>
        <h1>いいねはまだ来ていません</h1>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
  async created() {
    await this.getLikeNoti();
  },
  data(){
    return {
      likeNoti: [],
      userNum: undefined,
    }
  },
  methods: {
    async getLikeNoti() {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      const res = await axios.get('http://localhost:8080/likeNotification', {
        params: {
          receiverUserNum: this.userNum,
        }
      });
      this.likeNoti = res.data.followLikeNotificationList;
    }
  }

}
</script>

<style>

</style>