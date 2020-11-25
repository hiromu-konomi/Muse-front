<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center" id="registerUser">
          <v-toolbar-title>ユーザー登録</v-toolbar-title>
          <v-card-text>
            <v-form>
              <v-text-field
                type="email"
                prepend-icon="mdi-email"
                label="メールアドレス"
                v-model="email"
                outlined
              ></v-text-field>
              <v-text-field
                :append-icon="toggle.icon"
                :type="toggle.type"
                outlined
                prepend-icon="mdi-lock"
                label="パスワード"
                v-model="password"
                @click:append="show = !show"
              ></v-text-field>
              <v-card-actions class="registerBtn">
                <v-btn @click="onSubmit">登録</v-btn>
              </v-card-actions>
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
      show: false,
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          let user = res.user;
          console.log(user);
          firebase
            .firestore()
            .collection("users")
            .add({
              userId: user.uid,
              email: user.email,
            })
            .then(() => {
              this.$store.dispatch("sendEmail");
            })
            .catch((e) => console.log(e.message));
        });
    },

    //   onSubmit() {
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(this.email, this.password)
    //       .then(() => this.sendEmail(this.email))
    //       .catch((e) => console.log(e.message));
    //   },
    //   sendEmail() {
    //     const actionCodeSettings = {
    //       url: "http://" + location.host + "/signin",
    //     };
    //     firebase.auth().languageCode = "ja";
    //     const user = firebase.auth().currentUser;
    //     user
    //       .sendEmailVerification(actionCodeSettings)
    //       .then(() => alert("認証メールを送りました"))
    //       .catch((e) => console.log(e));
    //   },
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