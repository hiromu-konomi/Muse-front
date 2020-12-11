<template>
    <div>
        <v-card color="deep-purple accent-4" dark tile>
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
import {mapActions} from "vuex";

export default {
    components: {
        PostComponents,
    },
    data() {
        return {
            search_post : '',
        }
    },
    methods: {
        async search(){
            await this.postSearchText(this.search_post);
        },
    ...mapActions(["postSearchText"]),
    }

}
</script>

<style>

</style>