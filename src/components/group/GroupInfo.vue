<template>
    <v-container>
        <v-row
        style="height: 450px;"
        justify="center" align-content="center"
        >
            <v-col>
                <v-card
                 class="ma-2"
                >
                    <v-card-title class="red accent-3 headline">
                        <v-layout wrap justify-center>
                            <span class="white--text font-weight-bold">このグループについて</span>
                        </v-layout>
                    </v-card-title>

                    <v-divider class="mx-3"></v-divider>

                    <v-card-text>
                        <v-layout wrap justify-center>
                            <span class="groupInfo black--text" v-show="!(showForm)" v-if="$store.state.gDetail.groupData.groupDescription">
                                {{ $store.state.gDetail.groupData.groupDescription }}
                            </span>
                            <span class="groupInfo" v-show="!(showForm)" v-else>
                                {{ this.group_info }}
                            </span>
                            <v-text-field
                                v-show="showForm"
                                v-model="description"
                                class="groupInfo"
                                placeholder="ここは〇〇というグループです。主に〜〜〜〜〜ぜひお友達を招待してください！！"
                                outlined
                            ></v-text-field>
                            <v-btn class="groupInfo" @click="edit" v-show="!(showForm)" v-if="$store.getters.uid === $store.state.gDetail.groupData.ownerId">
                                編集
                            </v-btn>
                        </v-layout>
                    </v-card-text>

                    <v-card-actions v-show="showForm">
                        <v-spacer></v-spacer>
                        <v-btn color="blue accent-3" text @click="showForm = false">
                            キャンセル
                        </v-btn>
                        <v-btn color="blue accent-3" @click="upDescrip">
                            <span class="white--text">完了</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'GroupInfo',

    data() {
        return {
            group_info: "ここは〇〇というグループです。主に〜〜〜〜〜"
                        +"ぜひお友達を招待してください！！",
            showForm: false,
            description: undefined,
        }
    },

    methods: {
        edit() {
            this.showForm = true;
        },

        async upDescrip() {
            await this.setGrpDes({groupDes: this.description, groupId: this.$store.state.gDetail.groupData.groupId});
            this.showForm = false;
        },
        ...mapActions(["setGrpDes"])
    }
}
</script>

<style>
.groupInfo{
    font-size: 20px;
    margin: 0 auto;
}
</style>