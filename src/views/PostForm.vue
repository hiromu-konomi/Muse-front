<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center" width="900px">
          <v-card-text>
            <v-container center fill-height :linkable="false">
              <v-toolbar-title class="fav-text">
                ❤︎お気に入りの曲を選択
              </v-toolbar-title>
              <v-row>
                <v-col>
                  <MusicInfo :music="music" class="music"></MusicInfo>
                </v-col>
              </v-row>
              <v-btn to="/searchsong" color="#D8BFD8">曲を検索する</v-btn>
            </v-container>
            <hr />
            <v-row>
              <v-col
                ><v-toolbar-title class="userText"
                  >ユーザー名</v-toolbar-title
                ></v-col
              >
              <v-col class="userName"
                ><h2>{{ userName }}</h2></v-col
              >
            </v-row>
            <!-- </v-container> -->
            <v-spacer></v-spacer>
            <hr class="hr" />
            <v-form
              label-width="120px"
              class="jenre"
              :model="genre"
              ref="genreform"
            >
              <v-row>
                <v-col>
                  <v-toolbar-title class="genre"> ジャンル </v-toolbar-title>
                </v-col>
                <v-col>
                  <label>
                    <v-select
                      class="v-select"
                      v-model="genre.genreName"
                      item-text="label"
                      item-value="value"
                      :items="jenre"
                      label="ジャンルを選択"
                      :rules="[genres]"
                      required
                    >
                    </v-select>
                  </label>
                </v-col>
              </v-row>
            </v-form>
            <hr />
            <v-form label-width="120px" :model="form" ref="form">
              <v-container center fill-height>
                <v-toolbar-title class="review"> レビュー </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-textarea
                  class="textarea"
                  v-model="form.postText"
                  placeholder="入力してください"
                  ref="myTextarea"
                  :min-height="70"
                  :max-height="250"
                  counter="255"
                  :rules="[required, counter]"
                ></v-textarea>
              </v-container>

              <v-container center fill-height>
                <v-btn @click="onSubmit" color="#D8BFD8">投稿</v-btn>
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

export default {
  name: "post-form",

  components: {
    MusicInfo,
  },
  data() {
    return {
      form: {
        postText: "",
        userNum: "",
      },
      genre: {
        genreName: "",
        postId: "",
      },
      music: {},
      userName: this.$store.state.uDetail.userInformation.userName,
      jenre: [
        { label: "邦楽", value: "邦楽" },
        { label: "洋楽", value: "洋楽" },
        { label: "KPOP", value: "KPOP" },
        { label: "アニメ/ゲーム", value: "アニメ/ゲーム" },
        { label: "クラシック", value: "クラシック" },
        { label: "ラップ/ヒップホップ", value: "ラップ/ヒップホップ" },
        { label: "ジャズ", value: "ジャズ" },
        { label: "ロック/メタル", value: "ロック/メタル" },
      ],

      genres: (value) => !!value || "ジャンルを選択してください",
      //バリデーションチェック
      required: (value) => !!value || "入力してください.",
      //レビューフォームを255文字制限にする
      counter: (value) =>
        value.length <= 255 || "入力できるのは255文字までです。",
    };
  },
  computed: {
    ...mapGetters(["current"]),
  },

  created: async function () {
    console.log(this.$store.state.uDetail.userInformation);
    if (!this.current) {
      this.$router.push("/home");
    }
    this.music = Object.assign({}, this.current);
  },

  methods: {
    async onSubmit() {
      if (this.$refs.form.validate() & this.$refs.genreform.validate()) {
        this.form.userNum = this.$store.state.userNum;
        await this.postFormInfo(this.form);
        await this.getPostId(this.$store.state.userNum);
        this.genre.postId = await this.$store.state.rForm.postId;
        await this.postMusicInfo(Object.assign({}, this.music, this.genre));
        this.music = {};
        this.genreName = "";
        this.form = {};
        this.$router.push("/home");
      }
    },

    ...mapActions(["refresh", "postMusicInfo", "postFormInfo", "getPostId"]),
  },
};
</script>

<style>
textarea {
  width: 300px;
  height: 80px;
  border: solid 1px #000000;
}
.fav-text {
  color: #f08080;
}
.userText {
  position: absolute;
}
.userName {
  position: absolute;
  left: 50px;
}
.hr {
  position: absolute;
}

.genre {
  position: absolute;
  top: 265px;
}

.v-select {
  position: absolute;
  top: 30px;
  right: 0px;
}
.review {
  position: absolute;
  top: 330px;
}
.textarea {
  position: relative;
  top: 30px;
  left: 10px;
}
td {
  text-align: center;
}
</style>