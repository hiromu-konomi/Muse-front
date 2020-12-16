<template>
  <v-card>
    <!-- <div :class="{ linkable }" @click="onClick"> -->
    <router-link
      :to="{
        name: 'userpage',
        params: { user_id: user.userNum },
      }"
    >
      <v-row class="userInfo">
        <!-- <v-avatar @click="onClick">
        <v-img :src="user.userPhoto"></v-img>
      </v-avatar> -->
        <div class="user">
          {{ user.userName }}

          {{ user.depId }}
        </div>
      </v-row>
      <div class="profile">
        {{ user.profile }}
      </div>
    </router-link>
    <!-- </div> -->
  </v-card>
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
