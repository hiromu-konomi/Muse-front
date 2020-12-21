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
                        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3>{{ folNoti.userName }}にフォローされました</h3>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider :key="`second-${index}`"></v-divider>
            </template>
        </v-list>
        <v-card v-else>
            <v-card-text>
                <h1>フォローはまだ来ていません</h1>
            </v-card-text>
        </v-card>
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
            this.followNoti = res.data.followLikeNotificationList;
        }
    }
}
</script>

<style>

</style>