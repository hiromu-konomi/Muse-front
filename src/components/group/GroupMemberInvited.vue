<template>
    <v-card shaped width="600" class="ma-2">
        <v-card-title class="headline">招待済みメンバー</v-card-title>
        <v-divider class="mx-3"></v-divider>
        <v-list style="height: 100px;" color="purple" class="ma-3"
        v-for="groupUser in invited" :key="groupUser.id"
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
            invited: [
                {
                    id: '1',
                    name: 'テスト3',
                    picture: '',
                },
                {
                    id: '2',
                    name: 'テスト4',
                    picture: '',
                },
            ]
        }
    },

}
</script>

<style>

</style>