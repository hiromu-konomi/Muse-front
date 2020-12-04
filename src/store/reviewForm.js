import { UPDATE_CURRENT } from "@/mutation-types";

const reviewForm = {
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
};

export default reviewForm;
