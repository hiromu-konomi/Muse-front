<template>
    <v-container>
        <v-row
            style="height: 450px;"
            justify="center" align-content="center"
        >
            <v-col>
                <v-card>
                    <v-card-title class="green accent-4 headline">
                        <v-layout wrap justify-center>
                            <span class="white--text font-weight-bold">このグループに参加しているメンバー</span>
                        </v-layout>
                    </v-card-title>

                    <v-card-text>
                        <template v-for="(user, index) in users">
                            <v-list-item
                                :key="`first-${user.userNum}`"
                            >
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span>{{ user.userName }}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider :key="`second-${index}`"></v-divider>
                        </template>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GroupMember',

    async created() {
        await this.refresh();
    },

    data() {
        return {
            users: [],
        }
    },

    methods: {
        async refresh() {
            const res = await axios.get('http://localhost:8080/showGroupMember', {
                params: {
                    groupId: this.$store.state.gDetail.groupData.groupId,
                }
            });
            this.users = res.data.users;
        },
    },
}
</script>