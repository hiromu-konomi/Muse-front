<template>
  <div>
    <v-text-field class="search" v-model="search_group" type="text">
      <template v-slot:append>
        <v-icon type="button" @click="search">mdi-magnify</v-icon>
      </template>
    </v-text-field>
    <div v-if="this.count === 1">
      <v-list v-if="exploreGroupResult.length">
        <template v-for="(group, index) in exploreGroupResult">
          <v-list-item :key="group.groupId">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h2>{{ group.groupName }}</h2>
                <h5 v-if="group.groupDescription == null">
                  気軽にグループに参加してね
                </h5>
                <h5 v-else>{{ group.groupDescription }}</h5>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="toGroup(group.groupId)">
                <h6>グループ詳細へ</h6>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider :key="`second-${index}`"></v-divider>
        </template>
      </v-list>
      <v-list v-else>
        <h1 style="color: #aaaaaa">検索結果はありません</h1>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      search_group: "",
      exploreGroupResult: [],
      count: "",
    };
  },
  methods: {
    async search() {
      const res = await axios.get(this.$store.state.baseUrl + "/searchGroups", {
        params: {
          searchGroup: this.search_group,
        },
      });
      this.exploreGroupResult = res.data;
      this.count = 1;
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