<template>
<v-app>
 <v-content>
 <v-form>
<v-container>
    <v-row>
        <v-col>
            <v-text-field
              label="Search Song"
               class="search"
               v-model="search_music_name"
               type="text">
               <template v-slot:append>
                <v-icon type="button" @click="search_music">mdi-magnify</v-icon>
               </template>
            </v-text-field>
        </v-col>
    </v-row>
</v-container>
 </v-form>
                <MusicInfo
                  v-for="music of musics" :key="music.id"
                  :linkable="true"
                  :music="music"
                  class="music"
                  ></MusicInfo>
 </v-content>
</v-app>
</template>

<script>
import axios from 'axios'
import MusicInfo from "../components/Info/MusicInfo.vue"
export default {
    name: 'search',

    components: {
        MusicInfo
    },
    music_data: [],
    data(){
        return{
            search_music_name: '',
            searched_artist_name: "",
            searched_picture: "",
            searched_song: "",
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
            ],
            musics: [],
        };
    },
    methods:{
        search_music: function () {
            axios
                .get("https://api.spotify.com/v1/search",{
                headers: {
                    "Authorization":
                        "Bearer BQBReb8CaRW3eoAl3nx4y9mJyszGiUL6uXs5ZsZKXTkfhw89D71kGoTyCh_ZPaRk8RNqKne5p7O_S6oDYJI"
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
                console.log(this.music_data)
            })
            .catch(error=> console.log(error));
        },
        relative_data: function(){
            this.musics = [];

            for(var i=0; i<this.music_data.tracks.items.length; i++){
                this.musicInfo=this.music_data.tracks.items[i]
                this.musics.push({
                    searched_artist_name: this.musicInfo.artists[0].name,
                    searched_song: this.musicInfo.name,
                    searched_picture: this.musicInfo.album.images[2].url
                })
            }
        }
        },
        }
</script>

