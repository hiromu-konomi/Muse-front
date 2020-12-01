<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center" id="registerUser">
          <v-toolbar-title>ユーザー登録</v-toolbar-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                type="email"
                prepend-icon="mdi-email"
                label="メールアドレス"
                v-model="email"
                :rules="[emailRules]"
                outlined
              ></v-text-field>
              <v-text-field
                :append-icon="toggle.icon"
                :type="toggle.type"
                outlined
                prepend-icon="mdi-lock"
                label="パスワード"
                v-model="password"
                :rules="[passwordRules, passwordLimit]"
                @click:append="show = !show"
              ></v-text-field>
              <div class="test-center">
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
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",

      show: false,
      emailRules: (value) => !!value || "メールアドレスを入力してください",
      passwordRules: (value) => !!value || "パスワードを入力してください",
      passwordLimit: (value) =>
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
        "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字を含んでください",
    };
  },
  computed: {
    toggle() {
      const icon = this.show ? "mdi-eye" : "mdi-eye-off";
      const type = this.show ? "text" : "password";
      return { icon, type };
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            console.log(res.user);
            firebase.auth().languageCode = "ja";
            // await firebase
            //   .firestore()
            //   .collection(`users/${this.uid}/userDetail`)
            //   .add({
            //     userId: res.user.uid,
            //     email: res.user.email,
            //   });

            res.user.sendEmailVerification({
              url: "http://" + window.location.host + "/signin",
            });
          })
          .then(() => {
            alert("認証メールを送信しました");
          })
          .catch((e) => console.log(e.message));
      }
    },
    ...mapGetters(["uid"]),
  },
};
</script>

<style scoped>
#registerUser {
  margin-top: 100px;
}
.registerBtn {
  margin-left: 180px;
}
</style>