<template>
    <div>
        <v-card color="#ADD8E6" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Notification</h1>
                </v-layout>
            </v-card-text>
        </v-card>
        <v-tabs
            color="grey"
            centered
            grow
            icons-and-text
        >
            <v-tab
                v-for="item in items"
                :key="item.tab"
                :to="item.link"
                style="color: #AAAAAA;"
            >
                {{ item.tab }}
                <v-icon color="#FFCCFF">{{ item.icon }}</v-icon>
            </v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {tab: 'FOLLOW', icon: 'mdi-account-alert-outline', link: {name: "FollowNotification"}},
                {tab: 'LIKE', icon: 'mdi-account-heart-outline', link: {name: "LikeNotification"}},
                {tab: 'GROUP INVITE', icon: 'mdi-account-group-outline', link: {name: "GroupInviteNotification"}},
            ],
        }
    },
}
</script>

<style scoped>
h1 {
    font-family: 'メイリオ';
}
</style>