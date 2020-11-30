import Vue from "vue";
import Vuex from "vuex";
import reviewFrom from "./reviewForm.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    reviewFrom,
  },
});

export default store;
