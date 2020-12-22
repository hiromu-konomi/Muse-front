<template>
  <!-- <div :class="{ linkable }" @click="onClick"> -->
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
    <!-- <v-row class="userInfo">
        <v-avatar size="62">
          <v-img
            :src="'http://gahag.net/img/201602/25s/gahag-0059907781-1.jpg'"
          ></v-img>
        </v-avatar>
        <div class="user">
          {{ user.userName }}

          {{ user.depId }}
        </div>
      </v-row>
      <div class="profile">
        {{ user.profile }}
      </div> -->
  </router-link>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    user: { type: Object },
    // linkable: { type: Boolean, default: false },
  },

  methods: {
    onClick() {
      // if (this.linkable) {
      //   this.$router.push({
      //     name: "userpage",
      //     params: { user_id: user.userNum },
      //   });
      // }
    },
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
