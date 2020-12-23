<template>
    <div>
        <v-list v-if="followNoti.length">
            <template v-for="(folNoti, index) in followNoti">
                <v-list-item
                    :key="folNoti.notiId"
                    :to="{ name: 'userpage',
                    params: { user_id: folNoti.userNum }
                    }"
                >
                    <v-list-item-avatar>
                        <v-img :src="folNoti.photo"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="notifi">
                            <h3>{{ folNoti.userName }}にフォローされました</h3>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider :key="`second-${index}`"></v-divider>
            </template>
        </v-list>
        <v-list v-else>
            <h1 style="color: #AAAAAA;">フォローはまだ来ていません</h1>
        </v-list>
    </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
    async created() {
        await this.getFollower();
    },
    data(){
        return {
            followNoti: [],
            userNum: undefined,
        }
    },
    methods: {
        async getFollower(){
            await firebase.auth().onAuthStateChanged((user) => {
                this.userNum = user.uid;
            });
            const res = await axios.get('http://localhost:8080/followNotification', {
                params: {
                    receiverUserNum: this.userNum,
                }
            });
            let dataFollowerNoti = res.data.followLikeNotificationList;
            let userData = [];
            for(let data of dataFollowerNoti) {
                let userPhot = this.$store.getters.getUserPhotobyUserNum(data.userNum);
                data.photo = userPhot.downloadURL;
                userData.push(data);
            }
            this.followNoti = userData;
        },

    }
}
</script>

<style>
    .notifi{
        font-family: 'メイリオ';
    }
</style>