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
            <v-img :src=lkNoti.photo></v-img>
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
    <v-list v-else>
      <h1 style="color:#AAAAAA;">いいねはまだ来ていません</h1>
    </v-list>
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
      let dataLikeNoti = res.data.followLikeNotificationList;
      let userData = [];
      for(let data of dataLikeNoti) {
        let userPhot = this.$store.getters.getUserPhotobyUserNum(data.userNum);
        data.photo = userPhot.downloadURL;
        userData.push(data);
      }
      this.likeNoti = userData;
    }
  }

}
</script>

<style>

</style>