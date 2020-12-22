<template>
    <div>
        <v-card color="#FFC0CB" dark tile>
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
            <PostComponents />
    </div>
</template>

<script>
import PostComponents from "../post/PostComponents";
import axios from "axios";

export default {
    async created() {
        await this.search();
    },
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
            const res = await axios.get('http://localhost:8080/searchPost', {
                    params: {
                    searchPost: this.search_post
                }
            })
            this.exploreResult = res.data.exploreList;
            console.log("res.data.exploreList = " + res.data.exploreList);
            console.log("exploreResult.artistName = " + this.exploreResult.artistName);
        },
    }

}
</script>

<style>

</style>