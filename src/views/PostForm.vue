<template>
<v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center">
            <v-card-text>
        <v-container center fill-height :linkable="false">
        <v-toolbar-title> お気に入りの曲を選択 </v-toolbar-title>
        <MusicInfo :music="music" class="music"></MusicInfo>
        <v-btn to="/searchsong">曲を検索する</v-btn>
        </v-container>
        <hr />
        <v-container center fill-height label-width="120px" v-model="userName">
       <v-toolbar-title> ユーザー名 </v-toolbar-title>
       <v-spacer></v-spacer>
        <h4>{{ userName }}</h4>
      </v-container>
      
    <v-form label-width="120px" class="jenre" :model="genre">
        <v-container center fill-height>
       <v-toolbar-title> ジャンル </v-toolbar-title>
       <v-spacer></v-spacer>
       <label>
        <v-select
         v-model="genre.genreName"
         item-text="label"
         item-value="value"
         :items="jenre"
         label="ジャンルを選択"
         required
        >
        </v-select>
        </label>
        </v-container>
        </v-form>
    <v-form label-width="120px" class="review" :model="form">
        <v-container center fill-height>
        <v-toolbar-title> レビュー </v-toolbar-title>
        <v-spacer></v-spacer>
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
   </v-container>
</v-form>
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>

</template>

<script>
import MusicInfo from "../components/Info/MusicInfo";
import { mapGetters, mapActions } from "vuex";
// import axios from 'axios'

export default {
  name: "post-form",

    components: {
        MusicInfo,
    },
    data(){
        return {
        form: {
            postText: '',
            userNum: '',
        },
        genre: {
            genreName: '',
            postId: '',
        },
            music: {},
            userName: '',
        jenre: [ 
          { label: "邦楽", value: "邦楽" }, 
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
      await this.refresh(this.$store.state.userNum);
      if (!this.current) {
      this.$router.push("/home");
    }
    this.music = Object.assign({}, this.current);
    this.userName = this.$store.state.rForm.userName;
    },

    methods: {
        async onSubmit(){
            
            this.form.userNum = this.$store.state.userNum;
            await this.postFormInfo(
                this.form
            );
            await this.getPostId(this.$store.state.userNum);
            this.genre.postId = await this.$store.state.rForm.postId;
            console.log(this.$store.state.rForm.postId);
            await this.postMusicInfo(
               Object.assign({}, this.music, this.genre)

            );
            this.$router.push("/home");
            this.music = {};
            this.genreName = '';
            this.form = {};
        },
        ...mapActions(["refresh", "postMusicInfo", "postFormInfo", "getPostId"]),
    },

      console.log("music=" + this.music.artistName);
      console.log("userNum=" + this.$store.state.userNum);
      console.log("posttext=" + this.form.postText);
      this.form.userNum = this.$store.state.userNum;
      console.log("form.userNum=" + this.genreName);
      await this.postFormInfo(this.form);

      await this.postMusicInfo(Object.assign({}, this.music, this.genreName));
      this.$router.push("/home");
      this.music = {};
      this.form = {};
    },
    ...mapActions(["refresh", "postMusicInfo", "postFormInfo"]),
  },
};
</script>

<style>
textarea {
  width: 300px;
  height: 80px;
  border: solid 1px #000000;
}
</style>