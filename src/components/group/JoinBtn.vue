<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="blue accent-4"
                v-bind="attrs"
                v-on="on"
            >
                <span class="white--text font-weight-bold">＋ 参加する</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="blue-grey darken-4">
                <v-layout wrap justify-center>
                    <span class="white--text font-weight-bold">このグループに参加</span>
                </v-layout>
            </v-card-title>

            <v-card-text>
                <v-layout wrap justify-center align-end>
                    <v-container fluid>
                        <p><span class="black--text font-weight-bold">{{ $store.state.gDetail.groupData.groupName }}</span>に参加しますか？</p>
                        <span class="red--text text--accent-3 font-weight-bold">※ホーム画面の「Group」＞「参加しているグループ」からいつでも退会できます。</span>
                    </v-container>
                </v-layout>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue accent-3" text @click="dialog = false">
                    キャンセル
                </v-btn>
                <v-btn color="blue accent-3" @click="joinGroup">
                    <span class="white--text">参加</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            // ダイアログの開閉
            dialog: false,

            // ログインユーザーID
            userNum: undefined,
        }
    },

    methods: {
        async joinGroup() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.setJoinStatus({
                    userNum: user.uid,
                    groupId: this.$store.state.gDetail.groupData.groupId
                })
            });
            this.dialog = false;
        },
        ...mapActions(["setJoinStatus"]),
    },
}
</script>

<style scoped>
p {
    font-size: x-large;
    font-family: 'メイリオ';
}
</style>