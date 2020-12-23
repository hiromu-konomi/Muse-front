<template>
    <div>
        <v-text-field
            class="search"
            v-model="search_post"
            type="text"
        >
            <template v-slot:append>
                <v-icon type="button" @click="search">mdi-magnify</v-icon>
            </template>
        </v-text-field>
        <div v-if="this.count === 1">
            <div v-for="(info, index) in exploreResult" :key="index">
                <PostComponents :info="info" />
            </div>
            <v-list v-if="exploreResult.length === 0">
                <h1 style="color:#AAAAAA;">検索結果はありません</h1>
            </v-list>
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
            count: '',
        }
    },
    methods: {
        async search(){
            const res = await axios.get('http://localhost:8080/searchPost', {
                    params: {
                    searchPost: this.search_post
                }
            })
            let dataExploreSong = res.data.exploreList;
            let userData = [];
            for(let data of dataExploreSong){
                let userPhoto = this.$store.getters.getUserPhotobyUserNum(data.userNum);
                data.photo = userPhoto.downloadURL;
                userData.push(data);
            }
            this.exploreResult = userData;
            this.count = 1;
        },
    }

}
</script>

<style>
h1 {
    font-family: 'メイリオ';
}
</style>