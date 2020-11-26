<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center">
          <v-toolbar-title>プロフィール設定</v-toolbar-title>
          <v-card-text>
            <v-form :model="form">
              <v-row justify="center">
                <v-avatar v-if="uploadImageUrl" size="62">
                  <img :src="uploadImageUrl" alt="Avater" />
                </v-avatar>
              </v-row>
              <v-file-input
                accept="image/*"
                label="プロフィール画像をアップロードしてください"
                v-model="form.img"
                @change="onImagePicked"
              >
              </v-file-input>

              <v-text-field
                type="text"
                v-model="form.userName"
                label="ユーザー名"
                single-line
              >
              </v-text-field>
              <v-text-field
                v-model="form.date"
                single-line
                label="入社日
              "
              >
                <template v-slot:append-outer>
                  <date-picker v-model="form.date"></date-picker>
                </template>
              </v-text-field>
              <v-select
                v-model="form.occupation"
                label="部署名"
                item-text="occupationName"
                item-value="id"
                :items="occupations"
                required
              >
              </v-select>
              <v-textarea
                v-model="form.profile"
                label="プロフィール"
                single-line
                type="text"
              ></v-textarea>
              <div class="text-center">
                <v-btn @click="onSubmit">登録</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      occupations: [
        { occupationName: "Webエンジニア", id: 1 },
        { occupationName: "クラウドエンジニア", id: 2 },
        { occupationName: "機械学習エンジニア", id: 3 },
      ],
      form: {
        img: [],
        userName: "",
        date: null,
        occupation: null,
        profile: "",
      },
      uploadImageUrl: "",
    };
  },
  methods: {
    onImagePicked(file) {
      if (file != undefined && file !== null) {
        if (file.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.uploadImageUrl = fr.result;
        });
      } else {
        this.uploadImageUrl = "";
      }
    },
  },
};
</script>