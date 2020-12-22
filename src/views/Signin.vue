<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
        <v-card class="text-center" id="login">
          <v-toolbar-title> ログイン </v-toolbar-title>
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
                prepend-icon="mdi-lock"
                label="パスワード"
                v-model="password"
                outlined
                @click:append="show = !show"
              ></v-text-field>
              <div class="text-">
                <v-btn @click="Login">ログイン</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="text-center" id="registerUser">
          ユーザー登録は
          <router-link :to="{ name: 'Signup' }">こちら</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

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
    async Login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              await this.setLoginUser(user);

              await this.setUserId(user.uid);

              await this.findByUserId(user.uid);

              await this.getUserInfo(user.uid);

              if (this.$store.state.uDetail.userInformation === "") {
                this.$router.push("/userDetail");
              } else {
                this.$router.push("/home");
              }
            }
          });
        })
        .catch(() => alert("メールアドレスまたはパスワードが違います"));
    },

    ...mapActions([
      "setLoginUser",
      "setUserId",
      "deleteLoginUser",
      "findByUserId",
      "getUserInfo",
    ]),
  },
};
</script>

<style scoped>
#registerUser {
  margin-top: 20px;
}

#login {
  margin-top: 100px;
}

.loginBtn {
  margin-left: 180px;
}
</style>
