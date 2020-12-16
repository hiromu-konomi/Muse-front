<template>
    <v-card shaped width="600" class="ma-2">
        <v-card-title class="headline">参加中のメンバー</v-card-title>
        <v-divider class="mx-3"></v-divider>
        <v-list style="height: 100px;" color="purple" class="ma-3"
        v-for="groupUser in user" :key="groupUser.id"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="groupUser.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-layout wrap justify-center>
                        {{ groupUser.name }}
                    </v-layout>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            user: [
                {
                    id: '1',
                    name: '笠脇',
                    picture: '',
                },
                {
                    d: '2',
                    name: '傘',
                    picture: '',
                },
                {
                    id: '3',
                    name: '樹',
                    picture: '',
                },
                {
                    id: '4',
                    name: '中',
                    picture: '',
                },
                {
                    id: '5',
                    name: '中1',
                    picture: '',
                },
                {
                    id: '6',
                    name: '中2',
                    picture: '',
                },
                {
                    id: '7',
                    name: '中3',
                    picture: '',
                }
            ]
        }
    },

}
</script>

<style>

</style>