<template>
  <v-navigation-drawer permanent :width="350" fixed app>
    <v-card style="height: 100%">
      <v-card-title style="height: 10%" class="blue-grey darken-4">
        <span class="white--text font-weight-bold">Add Group</span>
        <v-btn class="pink accent-2" icon :to="{ name: 'home' }" absolute right>
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text style="height: 80%">
        <v-form>
          <v-text-field
            type="text"
            label="グループ名"
            v-model="group.groupName"
            outlined
          ></v-text-field>

          <v-text-field
            class="search"
            v-model="searchWord"
            type="text"
            label="友達を招待（任意）"
            outlined
          >
            <template v-slot:append>
              <v-icon type="button" @click="searchUser">mdi-magnify</v-icon>
            </template>
          </v-text-field>

          <div v-for="(user, index) in showUsers" :key="index">
            <v-checkbox
              :value="user.userNum"
              v-model="selectUsers"
              color="green accent-4"
            >
              <template v-slot:label>
                <v-avatar>
                  <v-img :src="user.photo"></v-img>
                </v-avatar>
                <span class="invName">{{ user.userName }}</span>
              </template>
            </v-checkbox>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions style="height: 10%">
        <v-layout justify-center>
          <v-btn color="blue accent-3" :width="250" @click="addGroup">
            <span class="white--text font-weight-bold">作成</span>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      group: {
        groupName: "",
      },
      searchWord: "",
      users: [],
      showUsers: [],
      userNum: undefined,
      selectUsers: [],
      request: {
        groupName: undefined,
        userNum: undefined,
        inviteUsers: undefined,
      },

      // textRules: (value) => !!value || "グループ名を入力してください",
    };
  },

  methods: {
    addGroup: async function () {
      await firebase.auth().onAuthStateChanged((user) => {
        this.setGroupData({
          userNum: user.uid,
          groupName: this.group.groupName,
          inviteUsers: this.selectUsers,
        });
      });
      this.$router.push("/groupInfo");
    },

    searchUser: async function () {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      const res = axios.get(this.$store.state.baseUrl + "/searchFollowing", {
        params: {
          followingUserNum: this.userNum,
          searchWord: this.searchWord,
        },
      });
      this.users = (await res).data;
      for (var user of this.users) {
        user.photo = this.$store.getters.getUserPhotobyUserNum(
          user.userNum
        ).downloadURL;
        this.showUsers.push(user);
      }
    },
    ...mapActions(["setGroupData"]),
  },
};
</script>

<style scoped>
.bg {
  background-color: #ffabce;
}
span {
  font-family: "メイリオ";
}
.invName {
  margin-left: 5%;
  font-size: large;
}
</style>