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
                v-model="userPhoto"
                type="file"
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
                v-model="form.hireDate"
                single-line
                label="入社日
              "
              >
                <template v-slot:append-outer>
                  <date-picker v-model="form.hireDate"></date-picker>
                </template>
              </v-text-field>
              <v-select
                v-model="form.depId"
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
import { mapActions } from "vuex";
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
        userName: "",
        hireDate: null,
        depId: null,
        profile: "",
        userNum: "",
      },
      userPhoto: [],
      uploadImageUrl: "",
      userNum: "",
    };
  },
  async created() {
    // console.log("ユーザー詳細画面でのuserID =" + this.$store.state.userId);
    // await this.findByUserId("111");
    // console.log(this.$store.state.uDetail.userInformation);
    // if (this.$store.state.uDetail.userInformation !== null) {
    //   this.$router.push("/home");
    // }
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

    async onSubmit() {
      this.form.userNum = this.$store.state.userNum;
      console.log(this.form);

      await this.addUserDetail(this.form);
      this.addUserPhoto(this.userPhoto);
      this.$router.push("/home");
      this.form = {};
    },
    ...mapActions(["addUserDetail", "findByUserId", "addUserPhoto"]),
  },
};
</script>