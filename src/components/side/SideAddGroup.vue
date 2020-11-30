<template>
    <v-navigation-drawer permanent absolute :width="350" app>
        <v-card style="height: 100%;">
            <v-card-title style="height: 10%;">
                <v-btn class="bg" icon :to="{name: 'home'}">
                    <v-icon large>mdi-close</v-icon>
                </v-btn>
                <span>グループを作成</span>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 80%;">
                <v-form>
                    <v-text-field
                        type="text"
                        label="グループ名"
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
                    <v-btn color="info" :width="250">作成</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<style scoped>
.bg {
    background-color: #DDDDDD;
}
</style>