import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import store from "./store";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import aws_exports from "./aws-exports";

//AWSの設定
Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD_Ni-GZi8H6JFCKIDAdZFXvK3ibAcYjN4",
  authDomain: "music-app-56cdc.firebaseapp.com",
  databaseURL: "https://music-app-56cdc.firebaseio.com",
  projectId: "music-app-56cdc",
  storageBucket: "music-app-56cdc.appspot.com",
  messagingSenderId: "791958197943",
  appId: "1:791958197943:web:66a3a8e94145374aac1f32",
  measurementId: "G-633CLDG4HQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
