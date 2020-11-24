<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center">
          <v-toolbar-title>ユーザー登録</v-toolbar-title>
          <v-card-text>
            <v-form>
              <v-text-field
                type="email"
                prepend-icon="mdi-email"
                label="メールアドレス"
                v-model="email"
              ></v-text-field>
              <v-text-field
                type="password"
                prepend-icon="mdi-lock"
                label="パスワード"
                v-model="password"
              ></v-text-field>
              <div calss="text-danger">{{ error }}</div>
              <div class="text-center">
                <v-card-actions>
                  <v-btn @click="onSubmit">登録</v-btn>
                </v-card-actions>
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
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => this.sendEmail(this.email))
        .catch((e) => (this.error = e.message));
    },
    sendEmail() {
      const actionCodeSettings = {
        url: "http://" + location.host + "/signin",
      };
      firebase.auth().languageCode = "ja";
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification(actionCodeSettings)
        .then(() => alert("認証メールを送りました"))
        .catch((e) => console.log(e));
    },
  },
};
</script>
