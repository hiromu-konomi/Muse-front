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
                    icons-and-text
                >
                    <v-tab
                        v-for="item in items"
                        :key="item.tab"
                        :to="item.link"
                    >
                        {{ item.tab }}
                        <v-icon>{{ item.icon }}</v-icon>
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
                { tab: 'INFO', icon: 'mdi-information', link: {name: "GroupInfo"}},
                { tab: 'CHAT', icon: 'mdi-chat', link: {name: "GroupChat"}},
                { tab: 'MEMBER', icon: 'mdi-account-multiple', link: {name: "GroupMember"}},
            ],
        }
    },
}
</script>