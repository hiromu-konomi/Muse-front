<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6 mt-5>
        <v-card class="text-center" id="registerUser">
          <v-toolbar-title>ユーザー登録</v-toolbar-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col>
                  <v-text-field
                    type="email"
                    prepend-icon="mdi-email"
                    label="メールアドレス"
                    v-model="email"
                    :rules="[emailRules]"
                    outlined
                    class="email"
                  >
                    <template v-slot:append-outer> @ </template>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-radio-group
                    class="radio"
                    :rules="[check]"
                    v-model="domain"
                  >
                    <v-radio
                      label="rakus-partners.co.jp"
                      value="rakus-partners.co.jp"
                    ></v-radio>
                    <v-radio label="rakus.co.jp" value="rakus.co.jp"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
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
                </v-col>
              </v-row>
              <div class="test-center">
                <v-btn color="teal lighten-3" @click="onSubmit">登録</v-btn>
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
      domain: "",
      emailDomain: [
        { domain: "rakus-partners.co.jp", id: "rakus-partners.co.jp" },
        { domain: "rakus.co.jp", id: "rakus.co.jp" },
      ],
      show: false,
      emailRules: (value) => !!value || "メールアドレスを入力してください",
      passwordRules: (value) => !!value || "パスワードを入力してください",
      passwordLimit: (value) =>
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,15}$/.test(value) ||
        "8文字以上15文字以下で入力してください。ただし半角英小文字大文字数字を含んでください",
      check: (value) => !!value || "選択してください",
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
          .createUserWithEmailAndPassword(
            this.email + "@" + this.domain,
            this.password
          )
          .then(() => {
            this.$router.push("/signin");
          })
          .catch(() => alert("このメールアドレスは既に登録されています"));
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
.email {
  margin-top: 29px;
}
.radio {
  margin-left: 20px;
  margin-top: 25px;
}
</style>
