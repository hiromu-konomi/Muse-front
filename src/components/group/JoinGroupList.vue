<template>
    <v-list v-if="groups.length">
        <template v-for="(group, index) in groups">
            <v-list-item
                :key="`first-${group.groupId}`"
            >
                <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title >
                        <h1>{{ group.groupName }}</h1>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        管理者：{{ group.ownerName }}
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn class="pink accent-2 " icon>
                        <v-icon color="white">mdi-close</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-divider :key="`second-${index}`"></v-divider>
        </template>
    </v-list>
    <span v-else>参加しているグループはありません</span>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
    async created() {
        await this.refresh();
    },

    data() {
        return {
            groups: [],
            userNum: undefined,
        }
    },

    methods: {
        async refresh() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.userNum = user.uid;
            });
            const res = await axios.get('http://localhost:8080/showJoinGroupList', {
                params: {
                    userNum: this.userNum,
                }
            });
            this.groups = res.data.joinGroups;
        }
    }
}
</script>