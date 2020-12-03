<template>
    <v-navigation-drawer permanent :width="350" fixed app>
        <v-card style="height: 100%;">
            <v-card-title style="height: 10%;">
                <span>グループを作成</span>
                <v-btn class="bg" icon :to="{name: 'home'}" absolute right>
                    <v-icon large color="white">mdi-close</v-icon>
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
                    <v-btn color="info" :width="250" @click="addGroup">作成</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
// import axios from 'axios'

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
            // if (this.$refs.form.validate()) {
            //     // await axios.post('http://localhost:8080/createGroup', this.group)
            // }
            this.$router.push("/groupInfo")
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: #FFABCE;
}
</style>