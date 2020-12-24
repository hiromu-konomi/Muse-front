<template>
    <div>
        <SideAddGroup />
        <v-main>
            <v-container fluid>
                <v-layout justify-center>
                    <v-flex xs9 mt-5>
                        <v-card style="height: 400px;">
                            <v-card-title style="height: 20%;" class="blue-grey darken-4">
                                <v-layout wrap justify-center>
                                    <span class="white--text font-weight-bold">新しいグループを作成してみましょう！</span>
                                </v-layout>
                            </v-card-title>

                            <v-card-text style="height: 80%;">
                                <v-container fluid>
                                    <v-row justify="center" align-content="start">
                                        <v-col>
                                            <h2 class="black--text">
                                                画面左のフォームからグループ名と招待するユーザーを登録できます。
                                            </h2>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" align-content="center" style="height: 220px">
                                        <v-col>
                                            <span style="font-size: 100px;" class="green--text text--accent-2">Create Group!!</span>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>              
            </v-container>
        </v-main>
    </div>
</template>

<script>
import SideAddGroup from "../components/side/SideAddGroup.vue"

export default {
    components: {
        SideAddGroup,
    }
}
</script>

<style scoped>
p {
    font-size: 200px;
}
</style>