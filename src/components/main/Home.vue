<template>
    <div>
        <v-card color="deep-purple accent-4" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Home</h1>
                </v-layout>
            </v-card-text>
        </v-card>
        <div v-for="(info, index) in infos" :key="index">
            <PostComponents :info="info" />
        </div>
    </div>
</template>

<script>
import PostComponents from "../post/PostComponents.vue";
import axios from 'axios';

export default {
    data(){
        return{
            userNum: '',
            infos: [],
        }
    },
    components: {
        PostComponents,
    },
    methods: {
        async reflesh(){
            const rev = await axios.get('http://localhost:8080/getMusicInfoAndReview', {
                    params: {
                        userNum: this.$store.state.userNum,
                    }
                });
                this.infos = rev.data.reviewAllList;
                // console.log("info="+this.info)
        }

    },
    async created() {
        await this.reflesh();
    }
}
</script>

<style scoped>
h1 {
    font-family: 'メイリオ';
}
</style>
