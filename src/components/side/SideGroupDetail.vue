<template>
    <v-navigation-drawer permanent :width="350" app>
        <v-card style="height: 100%;">
            <v-card-title style="height: 10%;" class="blue-grey darken-4">
                <span class="white--text font-weight-bold">Group</span>
                <v-btn class="purple accent-2" icon :to="{name: 'home'}" absolute right>
                    <v-icon color="white">mdi-home</v-icon>
                </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 90%;">
                <v-form class="tfma">
                    <v-text-field
                        class="search"
                        v-model="searchWord"
                        type="text"
                        label="グループを検索"
                        outlined
                    >
                        <template v-slot:append>
                            <v-icon type="button" @click="searchGroup">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>
                </v-form>

                <v-layout wrap justify-center>
                    <v-flex class="text-center" xs8 mt-5>
                        <v-btn color="yellow accent-2" block type="submit" to="/addGroup" class="sideBtn">
                            <span class="font-weight-bold">＋ 新しいグループを作成</span>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <span>管理しているグループ</span><br>
                <v-list v-if="ownerGroups.length">
                    <template v-for="(ownerGroup, index) in ownerGroups">
                        <v-list-item :key="`first-${ownerGroup.groupId}`">
                            <v-list-item-avatar>
                                <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    <h1>{{ ownerGroup.groupName }}</h1>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider :key="`second-${index}`"></v-divider>
                    </template>
                </v-list>

                <v-divider></v-divider>

                <span>参加しているグループ</span>
                <v-list v-if="joinGroups.length">
                    <template v-for="(joinGroup, index) in joinGroups">
                        <v-list-item :key="`first-${joinGroup.groupId}`">
                            <v-list-item-avatar>
                                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    <h1>{{ joinGroup.groupName }}</h1>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider :key="`second-${index}`"></v-divider>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
    data() {
        return {
            searchWord: '',
            ownerGroups: [],
            joinGroups: [],
            userNum: undefined,
        }
    },

    methods: {
        async searchGroup() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.userNum = user.uid;
            });
            axios.all([
                axios.get('http://localhost:8080/showOwnGrpsBySearch', {
                    params: {
                        userNum: this.userNum,
                        searchWord: this.searchWord,
                    }
                }),
                axios.get('http://localhost:8080/showJoinGrpsBySearch', {
                    params: {
                        userNum: this.userNum,
                        searchWord: this.searchWord,
                    }
                })
            ]).then( axios.spread( (ownRes, joinRes) => {
                this.ownerGroups = ownRes.data.ownerGroups;
                this.joinGroups = joinRes.data.joinGroups;
            }));
        },
    }
}
</script>

<style scoped>
span {
    font-family: 'メイリア';
}
.tfma {
    margin-top: 20px;
}
.sideBtn {
    margin-bottom: 20px;
}
</style>