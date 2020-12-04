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
              <v-card-actions class="loginBtn">
                <v-btn @click="Login">ログイン</v-btn>
              </v-card-actions>
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
    Login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push("/"))
        .catch((e) => (this.error = e.message));
    },
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