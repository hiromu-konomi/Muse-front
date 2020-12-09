
<template>
    <v-components>
    <v-card color="deep-purple accent-4" dark tile>
        <v-card-text>
            <v-layout wrap justify-center>
                <h1 class="white--text">Home</h1>
            </v-layout>
        </v-card-text>
    </v-card>
    <PostComponents />
    </v-components>
</template>

<script>
import PostComponents from "../post/PostComponents.vue";

export default {
    components: {
        PostComponents,
    }
}
</script>

<style scoped>
h1 {
    font-family: 'メイリオ';
}
</style>
