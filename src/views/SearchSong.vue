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
                v-model="musicName"
                type="text"
              >
                <template v-slot:append>
                  <v-icon type="button" @click="search_music"
                    >mdi-magnify</v-icon
                  >
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <MusicInfo
        v-for="music of musics"
        :key="music.id"
        :linkable="true"
        :music="music"
        class="music"
      ></MusicInfo>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import MusicInfo from "../components/Info/MusicInfo.vue";
export default {
  name: "search",

  components: {
    MusicInfo,
  },
  music_data: [],
  data() {
    return {
      musicName: "",
      artistName: "",
      image: "",
      searched_song: "",
      headers: [
        {
          text: "picture",
          value: "picture",
        },
        {
          text: "artist",
          value: "artist",
        },
        {
          text: "song",
          value: "song",
        },
      ],
      musics: [],
    };
  },
  methods: {
    search_music: function() {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization:

              "Bearer BQDJM2JHvpC5SJUSMVuIpLL8ucxPMXlXGU3i2KwoQ_pVxUFOnelntr9guj0TyCp5ulVY_nQViF0of5dCy2o",

          },
          params: {
            q: this.musicName,
            limit: "50",
            offset: "0",
            type: "track",
            market: "JP",
          },
        })
        .then((response) => {
          this.music_data = response.data;
          this.relative_data();
          console.log(this.music_data);
        })
        .catch((error) => console.log(error));
    },
    relative_data: function() {
      this.musics = [];

      for (var i = 0; i < this.music_data.tracks.items.length; i++) {
        this.musicInfo = this.music_data.tracks.items[i];
        this.musics.push({
          artistName: this.musicInfo.artists[0].name,
          musicName: this.musicInfo.name,
          image: this.musicInfo.album.images[2].url,
        });
      }
      console.log(this.musics);
      for (let m of this.musics) {
        console.log(m);
      }
    },
  },
};
</script>
