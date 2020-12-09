<template>
    <v-navigation-drawer permanent :width="350" fixed app>
        <v-card style="height: 100%;">
            <v-card-title style="height: 10%;" class="blue-grey darken-4">
                <span class="white--text font-weight-bold">Add Group</span>
                <v-btn class="pink accent-2" icon :to="{name: 'home'}" absolute right>
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 80%;">
                <v-form>
                    <v-text-field
                        type="text"
                        label="グループ名"
                        v-model="group.groupName"
                        
                        outlined
                    ></v-text-field>
                    <v-text-field
                        label="友達を招待（任意）"
                        outlined
                    ></v-text-field>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions style="height: 10%;">
                <v-layout justify-center>
                    <v-btn color="blue accent-3" :width="250" @click="addGroup">
                        <span class="white--text font-weight-bold">作成</span>
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            group: {
                groupName: "",
            },

            // textRules: (value) => !!value || "グループ名を入力してください",
        }
    },

    methods: {
        addGroup: async function() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.setGroupData({
                    groupName: this.group.groupName,
                    userNum: user.uid
                })
            })
            this.$router.push("/groupInfo")
        },
        ...mapActions(["setGroupData"]),
    },
}
</script>

<style scoped>
.bg {
    background-color: #FFABCE;
}
span {
    font-family: 'メイリオ';
}
</style>