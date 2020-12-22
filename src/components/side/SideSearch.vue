<template>
    <v-navigation-drawer
    parmanent
    right
    width="470"
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
                                <v-icon type="button" @click="get_token_to_search_music">mdi-magnify</v-icon>
                            </template>
                        </v-text-field>
                        <v-card v-if="musics.length == 0">
                            <v-card-text>
                                <h1>再生できない曲もあります</h1>
                            </v-card-text>
                        </v-card>
                        <div class="search">
                        <table class="table">
                            <tbody>
                                <tr v-for="info in musics" :key="info.searched_id">
                                    <img :src="info.searched_picture" />
                                    <td>{{ info.searched_artist_name }}</td>
                                    <td>{{ info.searched_song }}</td>
                                    <td>
                                        <v-btn @click="setMusicPlayer(info)">
                                            <v-icon>mdi-play</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <div id="aplayer">
                        <Aplayer :list="[]" :music="music" v-if="music.title" />
                    </div>
                </v-row>
            </v-container>
        </v-form>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios';
import Aplayer from 'vue-aplayer'

export default {
    name: 'search',
    music_data: [],
    components: {
        Aplayer,
    },
    data(){
        return{
            musics: [],
            music: {
                title: '',
                artist: '',
                src: '',
                pic: ''
            },
        };
    },
    methods:{
        get_token_to_search_music: function(){
            const url = "https://accounts.spotify.com/api/token";
            const requestBody =
                "grant_type=client_credentials"
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: "Basic YmI2NTVhOTM0NjA0NDc5NjhmMGFlM2E3Mzc4YTVmNDY6NjdhYmE5N2M4ODljNDQ0ZDllMDdjMmJmNjViMmIxMmQ=",
                },
            };

            axios
                .post(url, requestBody, requestConfig)
                    .then((res) => {
                        this.search_music(res.data.access_token)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
        },
        search_music: function(accessToken){
            console.log("accessToken =" + accessToken);
            axios
                .get("https://api.spotify.com/v1/search",{
                headers: {
                    "Authorization":
                        "Bearer " + accessToken
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
            for (var i=0; i < this.music_data.tracks.items.length; i++) {
                    this.musicInfo = this.music_data.tracks.items[i]
                    this.musics.push({
                        searched_artist_name: this.musicInfo.artists[0].name,
                        searched_song: this.musicInfo.name,
                        searched_picture: this.musicInfo.album.images[2].url,
                        searched_preview_url: this.musicInfo.preview_url,
                        searched_id : i + 1,
                    })
            }
            console.log(this.musics);
        },
        setMusicPlayer: function(info){
            this.music = {};
            this.music.title = info.searched_song;
            this.music.artist = info.searched_artist_name;
            this.music.src = info.searched_preview_url;
            this.music.pic = info.searched_picture;
            console.log(this.music.src);
        },
    }
}
</script>

<style>
    .classForSearchMusic{
        color: #DDDDDD
    }
    #aplayer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>