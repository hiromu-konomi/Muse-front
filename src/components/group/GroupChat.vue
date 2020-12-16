<template>
    <div>
        <v-sheet tile elevation="2" height="70">
            <v-row>
                <v-col cols="12" md="10">
                    <v-text-field
                        v-model="inputMessage"
                        class="vtf"
                        dense
                        outlined
                        prepend-inner-icon="mdi-lead-pencil"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="1">
                    <v-btn color="pink accent-3">
                        <v-icon color="white">mdi-music</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="12" md="1">
                    <v-btn
                        @click="addMessage"
                        text
                        icon
                        color="green accent-3"
                    >
                        <v-icon large>mdi-send</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>

<script>
import firebase from "firebase"
import { API, graphqlOperation } from "aws-amplify"
import { v4 as uuidv4 } from "uuid"

export default {
    name: 'GroupChat',

    async created() {
        await this.refresh();
    },

    data() {
        return {
            messageDatas: [],
            inputMessage: "",
            loginUserNum: undefined,
            now: "2020/01/01 00:00:00",
        }
    },

    methods: {
        async refresh() {
            await firebase.auth().onAuthStateChanged((user) => {
                this.loginUserNum = user.uid;
            });
        },

        async addMessage() {
            var date = new Date();

            this.now = date.getFullYear() + "/"
            + date.getMonth() + "/"
            + date.getDate() + " "
            + date.getHours() + "時"
            + date.getMinutes() + "分";
            
            const gqlParams = `
                mutation put {
                    createGroupChat(
                        input: {
                            chat_id: "${uuidv4()}",
                            group_id: "${this.$store.state.gDetail.groupData.groupId}",
                            user_num: "${this.loginUserNum}",
                            create_time: "${this.now}",
                            message_body: "${this.inputMessage}",
                        }
                    ) {
                        chat_id,
                        group_id,
                        user_num,
                        create_time,
                        message_body,
                    }
                }
            `;
            await API.graphql(graphqlOperation(gqlParams));
        },
    }
}
</script>

<style scoped>
.vtf {
    margin-left: 16px;
}
</style>