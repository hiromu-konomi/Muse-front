<template>
    <div>
        <v-card color="#ADD8E6" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Explore</h1>
                </v-layout>
            </v-card-text>
        </v-card>
            <v-text-field
                class="search"
                v-model="search_post"
                type="text"
            >
                <template v-slot:append>
                    <v-icon type="button" @click="search">mdi-magnify</v-icon>
                </template>
            </v-text-field>
            <div v-for="(info, index) in exploreResult" :key="index">
                <h1>{{ info.artistName }}</h1>
                <PostComponents :info="info" />
            </div>
    </div>
</template>

<script>
import PostComponents from "../post/PostComponents";
import axios from "axios";

export default {
    components: {
        PostComponents,
    },
    data() {
        return {
            search_post : '',
            exploreResult: [],
        }
    },
    methods: {
        async search(){
            console.log(this.search_post);
            const res = await axios.get('http://localhost:8080/searchPost', {
                    params: {
                    searchPost: this.search_post
                }
            })
            this.exploreResult = [];
            this.exploreResult = res.data.exploreList;
        },
    }

}
</script>

<style>
h1 {
    font-family: 'メイリオ';
}
</style>