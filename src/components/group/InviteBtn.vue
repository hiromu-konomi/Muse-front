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
                <span class="white--text font-weight-bold">＋ 招待する</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="blue-grey darken-4">
                <v-layout wrap justify-center>
                    <span class="white--text font-weight-bold">友達をこのグループに招待</span>
                </v-layout>
            </v-card-title>

            <v-card-text v-if="users.length">
                <v-form>
                        <div v-for="(user, index) in users" :key="index">
                            <v-checkbox
                                v-if="!(user.joinStatus === 1 || user.joinStatus === 2)"
                                :value="user.userNum"
                                v-model="selectUsers"
                                color="blue accent-3"
                            >
                                <template v-slot:label>
                                    <v-avatar>
                                        <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                                    </v-avatar>
                                    <span class="invName">{{ user.userName }}</span>
                                    <v-spacer></v-spacer>
                                    <span class="font-weight-bold green--text text--accent-4">招待可</span>
                                </template>
                            </v-checkbox>

                            <v-checkbox
                                v-else
                                :disabled="disStatus"
                            >
                                <template v-slot:label>
                                    <v-avatar>
                                        <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                                    </v-avatar>
                                    <span class="invName">{{ user.userName }}</span>
                                    <v-spacer></v-spacer>
                                    <span v-if="user.joinStatus === 1">参加中</span>
                                    <span v-else-if="user.joinStatus === 2" class="font-weight-bold red--text text--accent-3">招待中</span>
                                </template>
                            </v-checkbox>
                    </div>
                </v-form>
            </v-card-text>

            <v-card-text v-else>
                <v-layout wrap justify-center align-center>
                    <v-container fluid>
                        <span>招待できるユーザーが見つかりません</span>
                    </v-container>
                </v-layout>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue accent-3" text @click="dialog = false">
                    キャンセル
                </v-btn>
                <v-btn color="blue accent-3" @click="invite">
                    <span class="white--text">招待を送信</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
    async created() {
        await this.refresh();
    },

    data() {
        return {
            //ログインユーザーID
            userNum: undefined,

            // ダイアログの開閉
            dialog: false,

            // checkboxで選択したユーザーリスト
            selectUsers: [],

            // checkboxで選択不可にする
            disStatus: true,

            // フォローしているユーザーリスト
            users: [],

            // リクエスト用のオブジェクト
            request: {
                transferUser: undefined,
                receiverUsers: [],
                groupId: undefined,
            }
        }
    },

    methods: {
        async refresh() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.userNum = user.uid;
            })
            const res = await axios.get('http://localhost:8080/flwUserListAndJoinSts', {
                params: {
                    userNum: this.userNum,
                    groupId: this.$store.state.gDetail.groupData.groupId,
                }
            });
            this.users = res.data.followUsers;
        },

        async invite() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.request.transferUser = user.uid;
            });
            this.request.receiverUsers = this.selectUsers;
            this.request.groupId = this.$store.state.gDetail.groupData.groupId;
            await axios.post('http://localhost:8080/inviteGroup', this.request);
            this.dialog = false;
        },
    }
}
</script>

<style scoped>
.invName {
    margin-left: 5%;
    font-size: large;
}
</style>