<template>
    <div>
        <v-card color="deep-purple accent-4" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Group</h1>
                </v-layout>
            </v-card-text>
        </v-card>

        <v-tabs
            v-model="groupType"
            centered
            grow
        >
            <v-tab href="#manage">管理しているグループ</v-tab>
            <v-tab href="#join">参加しているグループ</v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <v-tabs-items v-model="groupType">
            <v-tab-item value="manage">
                <v-list>
                    <template v-for="(item, index) in items">
                        <v-list-item
                            :key="item.groupName"
                            :to="item.link"
                        >
                            <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title >
                                    <h1>{{ item.groupName }}</h1>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    管理者：{{ item.ownerName }}
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn class="pink accent-2 " icon>
                                    <v-icon color="white">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>

                        <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-tab-item>
        </v-tabs-items>

        <v-tabs-items v-model="groupType">
            <v-tab-item value="join">
                <v-list>
                    <template v-for="(item, index) in items">
                        <v-list-item
                            :key="item.groupName"
                            :to="item.link"
                        >
                            <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title >
                                    <h1>{{ item.groupName }}</h1>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    管理者：{{ item.ownerName }}
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn class="pink accent-2 " icon>
                                    <v-icon color="white">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>

                        <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
    data() {
        return {
            //表示するグループのリストを切り替え（ 管理しているグループ / 参加しているグループ ）
            groupType: 'manage',

            //管理しているグループ一覧
            manageGroups: [],

            //参加しているグループ一覧
            joinGroups: [],

            item: {
                avatar: undefined,
                groupName: undefined,
                ownerName: undefined,
                link: {name: "GroupInfo"}
            },

            items: [
                {
                    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                    groupName: "ロック",
                    subtitle: "許斐 大夢",
                    link: {name: "GroupInfo"},
                },
                {
                    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    groupName: "アニソン",
                    subtitle: "亜樹さん",
                    link: {name: "GroupInfo"},
                },
            ],
        }
    },

    created: async function() {
        await this.refresh();
    },

    methods: {
        refresh: async function() {
            // const res = await axios.get('http://localhost:8080/showManageGroup')
            // this
        },
    },
}
</script>

<style scoped>
h1 {
    font-family: 'メイリオ';
}
</style>