<template>
    <v-navigation-drawer permanent :width="350" app>
        <v-card style="height: 100%;">
            <v-card-title style="height: 10%;">
                <span >グループ</span>
                <v-btn class="bg" icon :to="{name: 'home'}" absolute right>
                    <v-icon color="white">mdi-home</v-icon>
                </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 90%;">
                <v-form class="tfma">
                    <v-text-field
                        class="search"
                        v-model="search_group_name"
                        type="text"
                        placeholder="グループを検索"
                        outlined
                    >
                        <template v-slot:append>
                            <v-icon type="button" @click="search_group">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>
                </v-form>

                <v-layout wrap justify-center>
                    <v-flex class="text-center" xs8 mt-5>
                        <v-btn color="yellow" block type="submit" to="/addGroup" class="sideBtn">
                            +Add Group
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

                <span>管理しているグループ</span><br>
                <v-list>
                    <v-list-item></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <span>参加しているグループ</span>
                <v-list>
                    <v-list-item></v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            search_group_name: '',
        }
    },

    methods: {
        search_group() {
            
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: #D0B0FF;
}
.tfma {
    margin-top: 20px;
}
.sideBtn {
    margin-bottom: 20px;
}
</style>