
<template>
    <div>
        <v-card color="deep-purple accent-4" dark tile>
            <v-card-text>
                <v-layout wrap justify-center>
                    <h1 class="white--text">Home</h1>
                </v-layout>
            </v-card-text>
        </v-card>
    <PostComponents />
    </div>
</template>

<script>
import PostComponents from "../post/PostComponents.vue";
import axios from 'axios';

export default {
    data(){
        return{
            userNum: '',
            postId: '',
        }
    },
    components: {
        PostComponents,
    },
    created: async function () {
        console.log(this.$store.state.userNum);
        const res = await axios.get('http://localhost:8080/getFollowingUser',{
            params: {
                userNum: this.$store.state.userNum
            }
        })
            this.postId = res.data
            console.log("postId="+this.postId);
    }
}
</script>

<style scoped>
h1 {
    font-family: 'メイリオ';
}
</style>
