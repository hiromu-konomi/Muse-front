<template>
<div id="form">
    <div class="text-center">
        <v-container center fill-height>
        <h3>お気に入りの曲を選択</h3>
        <MusicInfo :music="music" class="music"></MusicInfo>
        <v-btn to="/searchsong">曲を検索する</v-btn>
        </v-container>
        <hr />
    <v-form ref="form" label-width="120px" class="user-name">
        ユーザー名
    </v-form>
    </div>
</div>
</template>

<script>
import MusicInfo from "../components/Info/MusicInfo"
import { mapGetters } from "vuex";

export default {
    name: "post-form",

    components: {
        MusicInfo,
    },
    data(){
        return {
            music: {},
        }
    },
    computed: {
    ...mapGetters(["current"]),
  },
  created() {
    if (!this.current) {
      this.$router.push("/postform");
    }
    this.music = Object.assign({}, this.current);
  },
}
</script>
