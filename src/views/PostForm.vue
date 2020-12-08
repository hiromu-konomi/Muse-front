<template>
<div id="form">
    <div class="text-center">
        <v-container center fill-height :linkable="false">
        <h3>お気に入りの曲を選択</h3>
        <MusicInfo :music="music" class="music"></MusicInfo>
        <v-btn to="/searchsong">曲を検索する</v-btn>
        </v-container>
        <hr />
        <v-container center fill-height label-width="120px" v-model="userName">
        <h3>ユーザー名</h3>
        <h4>{{ userName }}</h4>
        </v-container>

        <v-container center fill-height>
        <h3>ジャンル</h3>
       <label>
        <v-select
         v-model="form.genreName"
         item-text="label"
         item-value="value"
         :items="jenre"
         label="ジャンルを選択"
         return-object
        >
        </v-select>
        </label>
        </v-container>
    <v-form label-width="120px" class="user-name" :model="form">
        <v-container center fill-height>
        <h3>レビュー</h3>
        <v-textarea
        v-model="form.postText"
         placeholder="入力してください"
         ref="myTextarea"
         :min-height="70"
         :max-height="250"
  ></v-textarea>
   </v-container>

   <v-container center fill-height>
       <v-btn @click="onSubmit">投稿</v-btn>
       <v-btn>削除</v-btn>
   </v-container>
</v-form>
    </div>
</div>
</template>

<script>
import MusicInfo from "../components/Info/MusicInfo"
import { mapGetters, mapActions } from "vuex";
// import axios from 'axios'

 
export default {
    name: "post-form",

    components: {
        MusicInfo,
    },
    data(){
        return {
        // info: {
        //     searched_artist_name: null,
        //     searched_song: null,
        //     searched_picture: null,
        //     review: '',
        //     label: null,
        //     value: null,
        // },
            genreName: null,
        form: {
            postText: '',
            userNum: '',
        },
            music: {},
            userName: '',
        jenre: [ 
          { label: '邦楽', value: '邦楽' }, 
          { label: '洋楽', value: '洋楽' }, 
          { label: 'KPOP', value: 'KPOP' },
          { label: 'アニメ/ゲーム', value: 'アニメ/ゲーム' }, 
          { label: 'クラシック', value: 'クラシック' }, 
          { label: 'ラップ/ヒップホップ', value: 'ラップ/ヒップホップ' },
          { label: 'ジャズ', value: 'ジャズ' }, 
          { label: 'ロック/メタル', value: 'ロック/メタル' },
      ], 
        }
    },
    computed: {
    ...mapGetters(["current"]),
  },
  created: async function () {
      await this.refresh("300");
      

      if (!this.current) {
      this.$router.push("/home");
    }
    this.music = Object.assign({}, this.current);
    this.userName = this.$store.state.rForm.userName;
    },

    methods: {
        async onSubmit(){
            // this.info.searched_artist_name=this.music.searched_artist_name;
            // this.info.searched_song=this.music.searched_song;
            // this.info.searched_picture=this.music.searched_picture;
            // this.info.review=this.form.review;
            // this.info.label=this.form.jenre.label;
            // this.info.value=this.form.jenre.value;
            
            console.log("music="+this.music);
            console.log(this.$store.state.userId);
            console.log("posttext="+this.form.postText);
            this.form.userNum = this.$store.state.userNum;
            await this.postFormInfo(
                this.form
            );
            await this.postMusicInfo(
               Object.assign({}, this.music, this.genreName)

            );
            this.$router.push("/home");
            this.music = {};
            this.form = {};
        },
        ...mapActions(["refresh", "postMusicInfo", "postFormInfo"]),
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