import Vue from 'vue'
import Vuex from 'vuex'
import { UPDATE_CURRENT } from "@/mutation-types";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music_data: [],
    current: null,
  },
  getters: {
    current(state) {
      return state.current;
    },
  },
  mutations: {
    [UPDATE_CURRENT](state, music) {
      state.current = music;
    },
  },
  actions: {
    [UPDATE_CURRENT]({ commit }, music) {
      commit(UPDATE_CURRENT, music);
    },
  },
  modules: {
  }
})
