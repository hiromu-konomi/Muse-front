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
                                <v-col class="text-center" v-if="$store.state.gDetail.groupData.joinStatus = 1">
                                    <InviteBtn />
                                </v-col>
                                <v-col class="text-center" v-else>
                                    <v-btn
                                        color="primary"
                                    >
                                        ＋ 参加する
                                    </v-btn>
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
import InviteBtn from "../components/group/InviteBtn"

export default {
    components: {
        SideGroupDetail,
        InviteBtn,
    },

    data() {
        return {
            // グループの情報
            group: {
                groupName: undefined,
                ownerName: undefined,
            },

            // 選択しているタブ
            tab: null,

            // それぞれのタブの情報リスト
            items: [
                { tab: 'INFO', icon: 'mdi-information', link: {name: "GroupInfo"}},
                { tab: 'CHAT', icon: 'mdi-chat', link: {name: "GroupChat"}},
                { tab: 'MEMBER', icon: 'mdi-account-multiple', link: {name: "GroupMember"}},
            ],
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