<template>
  <div>
    <div v-if="$store.state.gDetail.groupData.joinStatus === 1">
      <v-sheet tile elevation="2" height="70">
        <v-row>
          <v-col cols="12" md="11">
            <v-text-field
              v-model="inputMessage"
              class="vtf"
              dense
              outlined
              prepend-inner-icon="mdi-lead-pencil"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="1">
            <v-btn @click="addMessage" text icon color="green accent-3">
              <v-icon large>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
      <div v-if="$store.state.gChat.chatDatas">
        <template v-for="chat in $store.getters.showChats">
          <div :key="chat.groupChatId">
            <v-container
              v-if="chat.userNum === $store.getters.uid"
              fluid
              class="leftCon"
            >
              <v-row>
                <v-layout wrap justify-start>
                  <v-avatar>
                    <v-img :src="chat.photo"></v-img>
                  </v-avatar>

                  <v-chip class="ma-2 yellow accent-2">
                    {{ chat.chatText }}
                  </v-chip>
                </v-layout>
              </v-row>
              <v-row>
                <v-layout wrap justify-start>
                  <span>{{ chat.submitTime }}</span>
                </v-layout>
              </v-row>
            </v-container>

            <v-container v-else fluid>
              <v-row class="rightCon">
                <v-layout wrap justify-end>
                  <v-chip class="ma-2">
                    {{ chat.chatText }}
                  </v-chip>

                  <v-avatar>
                    <v-img :src="chat.photo"></v-img>
                  </v-avatar>
                </v-layout>
              </v-row>
              <v-row class="rightCon">
                <v-layout wrap justify-end>
                  <span>{{ chat.submitTime }}</span>
                </v-layout>
              </v-row>
            </v-container>
          </div>
        </template>
      </div>
    </div>
    <span v-else>グループに参加してからでないとチャットは見れません</span>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "GroupChat",

  async created() {
    await this.refresh();
  },

  data() {
    return {
      inputMessage: "",
      loginUserNum: undefined,
      now: "2020/01/01 00:00:00",
      request: {
        groupId: undefined,
        userNum: undefined,
        submitTime: undefined,
        chatText: undefined,
      },
    };
  },

  methods: {
    async refresh() {
      // グループIDをもとにそのグループのチャット情報リストを取得
      await this.setChatDatas(this.$store.state.gDetail.groupData.groupId);
    },
    ...mapActions(["setChatDatas"]),

    async addMessage() {
      await firebase.auth().onAuthStateChanged((user) => {
        this.loginUserNum = user.uid;
      });

      var date = new Date();

      this.now =
        date.getFullYear() +
        "/" +
        date.getMonth() +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        "時" +
        date.getMinutes() +
        "分";

      this.request.groupId = this.$store.state.gDetail.groupData.groupId;
      this.request.userNum = this.loginUserNum;
      this.request.submitTime = this.now;
      this.request.chatText = this.inputMessage;

      await axios.post(this.$store.state.baseUrl + "/addMessage", this.request);
      await this.refresh();
    },
  },
};
</script>

<style scoped>
.vtf {
  margin-left: 16px;
}
.leftCon {
  margin-left: 150px;
}
.rightCon {
  margin-right: 100px;
}
</style>