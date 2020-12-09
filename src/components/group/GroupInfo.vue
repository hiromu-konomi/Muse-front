<template>
    <v-container>
        <v-row
        style="height: 450px;"
        justify="center" align-content="center"
        >
            <v-col>
                <v-card
                color="deep-orange" class="ma-2"
                >
                    <v-card-title class="headline"></v-card-title>
                    <v-card-subtitle>このグループについて</v-card-subtitle>
                    <v-divider class="mx-3"></v-divider>
                    <v-card-text>
                        <v-text class="groupInfo">
                            {{ this.group_info }}
                        </v-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'GroupInfo',
    data() {
        return {
            group_info: "ここは〇〇というグループです。主に〜〜〜〜〜"
                        +"ぜひお友達を招待してください！！"
        }
    }
}
</script>

<style>
.groupInfo{
    font-size: 20px;
    /* color: #FFCCFF; */
    width: 80%;
    margin: 0 auto;
    max-width: 500px;
}
</style>