<template>
    <div>
        <v-card color="#ADD8E6" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Group</h1>
                </v-layout>
            </v-card-text>
        </v-card>

        <v-tabs
            centered
            grow
        >
            <v-tab
                v-for="tab in tabs"
                :key="tab.title"
                :to="tab.link"
            >
                {{ tab.title }}
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
            tabs: [
                { title: '管理しているグループ', link: {name: "OwnerGroupList"}},
                { title: '参加しているグループ', link: {name: "JoinGroupList"}},
            ],
        }
    },
}
</script>