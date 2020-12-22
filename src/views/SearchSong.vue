<template>
  <v-app>
    <v-content>
      <v-form>
        <v-container>
          <h2>お気に入りの曲を選択してください</h2>
          <v-row>
            <v-col>
              <v-text-field
                label="アーティスト名/曲名を入力してください"
                class="search"
                v-model="musicName"
                type="text"
                @keyup.enter="search_music">
                <template v-slot:append>
                  <v-icon type="button" @click="get_token_to_search_music"
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
    get_token_to_search_music: function () {
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
    search_music: function (accessToken) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            "Authorization":
              "Bearer " + accessToken
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
        })
        .catch((error) => console.log(error));
    },
    relative_data: function () {
      this.musics = [];

      for (var i = 0; i < this.music_data.tracks.items.length; i++) {
        this.musicInfo = this.music_data.tracks.items[i];
        this.musics.push({
          artistName: this.musicInfo.artists[0].name,
          musicName: this.musicInfo.name,
          image: this.musicInfo.album.images[2].url,
        });
      }
      for (let m of this.musics) {
        console.log(m);
      }
    },
  },
};
</script>
