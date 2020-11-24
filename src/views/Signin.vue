<template>
  <v-container>
    <v-layout>
      <v-flex xs5 mt-5>
        <v-card class="elevation-12">
          <v-toolbar-title> ログイン </v-toolbar-title>
          <v-card-text>
            <v-form>
              <v-text-field
                type="email"
                append-icon="mdi-email"
                label="メールアドレス"
                v-model="email"
              ></v-text-field>
              <v-text-field
                type="password"
                append-icon="mdi-lock"
                label="パスワード"
                v-model="password"
              ></v-text-field>
              <v-card-actions>
                <v-btn @click="Login"></v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
