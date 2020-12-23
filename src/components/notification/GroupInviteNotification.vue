<template>
  <div>
    <v-list v-if="groupNoti.length">
      <template v-for="(grpNoti, index) in groupNoti">
        <v-list-item
          :key="grpNoti.groupNotificationId"
        >
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h5>{{ grpNoti.transferUserName }}から</h5>
              <h3>{{ grpNoti.groupName }}に招待されました</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider :key="`second-${index}`"></v-divider>
      </template>
    </v-list>
    <v-list v-else>
      <h1 style="color:#AAAAAA;">グループ招待はまだありません</h1>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
  async created() {
    await this.getGroupNoti();
  },
  data(){
    return {
      groupNoti: [],
      userNum: undefined,
    }
  },
  methods: {
    async getGroupNoti(){
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      const res = await axios.get('http://localhost:8080/groupNotification', {
        params: {
          receiverUserNum: this.userNum,
        }
      });
      this.groupNoti = res.data.groupToResponseList;
    }
  }
}
</script>

<style>

</style>