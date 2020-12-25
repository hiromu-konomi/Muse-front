<template>
  <router-link
    :to="{
      name: 'userpage',
      params: { user_id: user.userNum },
    }"
  >
    <v-list class="userInfo">
      <v-list-item>
        <v-list-item-avatar size="62">
          <v-img :src="user.photo"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <h3>{{ user.userName }}</h3>
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.depName }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ user.profile }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </router-link>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    user: { type: Object },
  },
};
</script>

<style scoped>
.user {
  padding-top: 3px;
  /* border: solid 1px black; */
}

.userInfo {
  margin-left: 20px;
  margin-top: 5px;
}

.profile {
  /* margin-top: 5px; */
  padding-bottom: 10px;
}
</style>
