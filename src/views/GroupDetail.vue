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
                                <v-col cols="12" md="10">
                                    <span class="grnm font-weight-bold">{{ $store.state.gDetail.groupData.groupName }}</span>
                                </v-col>
                                <v-col class="text-center" v-if="$store.state.gDetail.groupData.joinStatus === 1" cols="12" md="2">
                                    <InviteBtn />
                                </v-col>
                                <v-col class="text-center" v-else cols="12" md="2">
                                    <JoinBtn />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-flex>
                </v-layout>                

                <v-divider></v-divider>
                
                <v-tabs
                    v-model="tab"
                    color="blue accent-4"
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
import JoinBtn from "../components/group/JoinBtn"

export default {
    components: {
        SideGroupDetail,
        InviteBtn,
        JoinBtn
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