<template>
  <div>
    <v-list v-if="groupNoti.length">
      <template v-for="(grpNoti, index) in groupNoti">
        <v-list-item :key="grpNoti.groupNotificationId">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h5>{{ grpNoti.transferUserName }}から</h5>
              <h3>{{ grpNoti.groupName }}に招待されました</h3>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="toGroup(grpNoti.groupId)">
              <h6>グループ詳細へ</h6>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-divider :key="`second-${index}`"></v-divider>
      </template>
    </v-list>
    <v-list v-else>
      <h1 style="color: #aaaaaa">グループ招待はまだありません</h1>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  async created() {
    await this.getGroupNoti();
  },
  data() {
    return {
      groupNoti: [],
      userNum: undefined,
    };
  },
  methods: {
    async getGroupNoti() {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      const res = await axios.get(
        this.$store.state.baseUrl + "/groupNotification",
        {
          params: {
            receiverUserNum: this.userNum,
          },
        }
      );
      this.groupNoti = res.data.groupToResponseList;
    },
    async toGroup(groupId) {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      await this.setShowGroup({ groupId: groupId, userNum: this.userNum });
      this.$router.push("/groupInfo");
    },
    ...mapActions(["setShowGroup"]),
  },
};
</script>

<style>
</style>