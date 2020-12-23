<template>
    <div>
        <v-card color="#ADD8E6" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Explore</h1>
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
                {tab: 'SONG', icon: 'mdi-music-circle-outline', link: {name: "SongExplore"}},
                {tab: 'USER', icon: 'mdi-account-search-outline', link: {name: "UserExplore"}},
                {tab: 'GROUP', icon: 'mdi-account-group-outline', link: {name: "GroupExplore"}},
            ],
        }
    },
}
</script>

<style>
h1 {
    font-family: 'メイリオ';
}
</style>