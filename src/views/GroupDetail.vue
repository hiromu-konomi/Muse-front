<template>
    <div>
        <SideGroupDetail />
        <v-main fluid>
            <v-card
                tile
            >
                <v-tabs
                    v-model="tab"
                    centered
                    grow
                >
                    <v-tab
                        v-for="item in items"
                        :key="item.tab"
                        :to="item.link"
                    >
                        {{ item.tab }}
                    </v-tab>
                </v-tabs>
            </v-card>
            <router-view />
        </v-main>
    </div>
</template>

<script>
import SideGroupDetail from "../components/side/SideGroupDetail"

export default {
    components: {
        SideGroupDetail,
    },

    data() {
        return {
            tab: null,
            items: [
                { tab: '情報', link: {name: "GroupInfo"}},
                { tab: 'チャット', link: {name: "GroupChat"}},
                { tab: 'メンバー', link: {name: "GroupMember"}},
            ],
        }
    },
}
</script>