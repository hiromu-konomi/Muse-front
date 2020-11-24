<template>
  
    <v-navigation-drawer permanent absolute>
     

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home', link: {name: "home"}},
          { title: 'Notification', icon: 'mdi-bell', link: {name: "notification"}},
          { title: 'Ranking', icon: 'mdi-crown', link: {name: "ranking"}},
          { title: 'Group', icon: 'mdi-human-greeting', link: {name: "group"} },
          { title: 'Mypage', icon: 'mdi-emoticon', link: {name: "mypage"} },
          { title: 'Explore', icon: 'mdi-magnify', link: {name: "explore"} },
          { title: 'Support', icon: 'mdi-feather', link: {name: "support"} },
        ],
        right: null,
      }
    },
  }
</script>