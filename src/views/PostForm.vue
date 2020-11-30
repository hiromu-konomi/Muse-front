<template>
<div id="form">
    <div class="text-center">
        <v-container center fill-height>
        <h3>お気に入りの曲を選択</h3>
        <MusicInfo :music="music" class="music"></MusicInfo>
        <v-btn to="/searchsong">曲を検索する</v-btn>
        </v-container>
        <hr />
        <v-container center fill-height>
    <v-form ref="form" label-width="120px" class="user-name">
        <h3>ユーザー名</h3>
    </v-form>
        </v-container>

        <v-container center fill-height>
        <h3>ジャンル</h3>
       <label>
        <v-select v-model="selectedGenre"
         item-text="label"
         item-value="value"
         :items="janre"
         label="ジャンルを選択"
         return-object
        >
        </v-select>
        </label>
        </v-container>

        <v-container center fill-height>
        <h3>レビュー</h3>
        <v-textarea
         placeholder="入力してください"
         ref="myTextarea"
         v-model="value"
         :min-height="70"
         :max-height="250"
  ></v-textarea>
   </v-container>

   <v-container center fill-height>
       <v-btn>投稿</v-btn>
       <v-btn>削除</v-btn>
   </v-container>
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
            value: '',

            selectedGenre: '', 
            janre: [ 
          { label: '邦楽' }, 
          { label: '洋楽' }, 
          { label: 'KPOP' },
          { label: 'アニメ/ゲーム' }, 
          { label: 'クラシック' }, 
          { label: 'ラップ/ヒップホップ' },
          { label: 'ジャズ' }, 
          { label: 'ロック/メタル' }
      ], 
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

<style>
        textarea {
            width: 300px;
            height: 80px;
            border: solid 1px #000000;
        }
</style>