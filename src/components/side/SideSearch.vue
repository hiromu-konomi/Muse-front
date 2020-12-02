<template>
    <v-navigation-drawer
    absolute
    parmanent
    right
    width="500"
    app
    >
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            class="search"
                            v-model="search_music_name"
                            type="text"
                        >
                            <template v-slot:append>
                                <v-icon type="button" @click="search_music">mdi-magnify</v-icon>
                            </template>
                        </v-text-field>
                        <div class="search">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Artist</th>
                                    <th scope="col">Song</th>
                                    <!-- <th scope="col">uri</th> -->
                                    <th scope="col">button</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="info in musics" :key="info.searched_id">
                                    <img :src="info.searched_picture" />
                                    <td>{{ info.searched_artist_name }}</td>
                                    <td>{{ info.searched_song }}</td>
                                    <!-- <td>{{ info.searched_uri }}</td> -->
                                    <v-btn @click="play_music">play</v-btn>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <v-data-table
                            :headers="headers"
                            :items="musics"
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios';
export default {
    name: 'search',
    music_data: [],
    data(){
        return{
            search_music_name: '',
            searched_artist_name: "",
            searched_picture: "",
            searched_song: "",
            searched_uri: "",
            searched_id: "",
            headers: [
                {
                    text: 'picture',
                    value: 'picture'
                },
                {
                    text: 'artist',
                    value: 'artist'
                },
                {
                    text: 'song',
                    value: 'song'
                },
                {
                    text: 'uri',
                    value: 'uri'
                },
                {
                    text: 'button',
                    value: 'button'
                },
            ],
            musics: [],
            musicInfo: [],
        };
    },
    methods:{
        search_music: function(){
            axios
                .get("https://api.spotify.com/v1/search",{
                headers: {
                    "Authorization":
                        "Bearer BQDXrliGyIcHfaYVA8tjoBEj1Z3SwgMpakfssGd0veftNWXIPoo_TXKdf4ecFIRuwYvwVq1whkEsSnJk7AQ"
                },
                params: {
                    q: this.search_music_name,
                    limit: "50",
                    offset: "0",
                    type: "track",
                    market: "JP"
                }
            })
            .then(response=>{
                this.music_data = response.data;
                this.relative_data();
            })
            .catch(error=> console.log(error));
        },
        relative_data: function(){
            this.musics = [];
            console.log(this.music_data);
            //一時的にコメントアウト
            for (var i=0; i < this.music_data.tracks.items.length; i++) {
                    this.musicInfo = this.music_data.tracks.items[i]
                    this.musics.push({
                        searched_artist_name: this.musicInfo.artists[0].name,
                        searched_song: this.musicInfo.name,
                        searched_picture: this.musicInfo.album.images[2].url,
                        searched_uri: this.musicInfo.uri,
                        searched_id : i + 1,
                    })
            }
            console.log(this.musics);
        },
        play_music: function(){
            fetch('https://api.spotify.com/v1/me/player/play',{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":
                        "Bearer BQDXrliGyIcHfaYVA8tjoBEj1Z3SwgMpakfssGd0veftNWXIPoo_TXKdf4ecFIRuwYvwVq1whkEsSnJk7AQ"
                },
                params: {
                    uris: this.musics.searched_uri
                }
            })
        }
}
}
</script>

<style>
    .classForSearchMusic{
        color: #DDDDDD
    }
</style>