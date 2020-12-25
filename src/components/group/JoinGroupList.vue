<template>
  <v-list v-if="groups.length">
    <template v-for="(group, index) in groups">
      <v-list-item :key="`first-${group.groupId}`">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <h1>{{ group.groupName }}</h1>
          </v-list-item-title>
          <v-list-item-subtitle>
            管理者：{{ group.ownerName }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="toGroup(group.groupId)" class="green accent-3" icon>
            <v-icon color="white">mdi-arrow-up-bold-box-outline</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn
            @click="deleteConfilm(group.groupId)"
            class="pink accent-2"
            icon
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider :key="`second-${index}`"></v-divider>
    </template>
    <!-- 削除確認ダイアログを追加 -->
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">退会確認</v-card-title>
        <v-card-text>このグループを退会しますか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false"
            >キャンセル</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteGroup">退会</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
  <span v-else>参加しているグループはありません</span>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  async created() {
    await this.refresh();
  },

  data() {
    return {
      groups: [],
      userNum: undefined,
      deleteDialog: false,
      selectGroupId: undefined,
    };
  },

  methods: {
    async refresh() {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      const res = await axios.get(
        this.$store.state.baseUrl + "/showJoinGroupList",
        {
          params: {
            userNum: this.userNum,
          },
        }
      );
      this.groups = res.data.joinGroups;
    },

    async toGroup(groupId) {
      await firebase.auth().onAuthStateChanged((user) => {
        this.userNum = user.uid;
      });
      await this.setShowGroup({ groupId: groupId, userNum: this.userNum });
      this.$router.push("/groupInfo");
    },

    //削除確認ダイアログ表示を追加
    deleteConfilm(groupId) {
      this.deleteDialog = true;
      this.selectGroupId = groupId;
    },

    //グループを削除する
    async deleteGroup() {
      await axios.get(this.$store.state.baseUrl + "/deleteJoinGroups", {
        params: {
          groupId: this.selectGroupId,
          userNum: this.userNum,
        },
      });
      this.deleteDialog = false;
      this.refresh();
    },

    ...mapActions(["setShowGroup"]),
  },
};
</script>