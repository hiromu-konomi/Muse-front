<template>
    <div>
        <SideGroupDetail />
        <v-main fluid>
            <v-card
                tile
            >
                <v-layout wrap justify-center>
                    <v-flex xs12>
                        <v-container fluid>
                            <v-row>
                                <v-col>
                                    <span class="grnm font-weight-bold">{{ $store.state.gDetail.groupData.groupName }}</span>
                                </v-col>
                                <v-col>
                                    <v-btn color="primary">＋ 招待する</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-flex>
                </v-layout>                

                <v-divider></v-divider>
                
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
            group: {
                groupName: undefined,
                ownerName: undefined,
            }
        }
    },
}
</script>

<style scoped>
span.grnm {
    font-size: xx-large;
    font-family: 'メイリオ';
}
</style>