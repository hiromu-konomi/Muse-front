<template>
  <div>
    <v-text-field
      class="search"
      v-model="search_group"
      type="text"
    >
      <template v-slot:append>
        <v-icon type="button" @click="search">mdi-magnify</v-icon>
      </template>
    </v-text-field>
    <div v-if="this.count === 1">
      <v-list v-if="exploreGroupResult.length">
        <template v-for="(group, index) in exploreGroupResult">
          <v-list-item
            :key="group.groupId"
          >
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h2>{{ group.groupName }}</h2>
                <h5 v-if="group.groupDescription == null">気軽にグループに参加してね</h5>
                <h5 v-else>{{ group.groupDescription }}</h5>
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
      search_group: '',
      exploreGroupResult: [],
      count: '',
    }
  },
  methods: {
    async search() {
      const res = await axios.get('http://localhost:8080/searchGroups', {
        params: {
          searchGroup: this.search_group
        }
      })
      this.exploreGroupResult = res.data;
      this.count = 1;
    },
    }
  }
</script>

<style>

</style>