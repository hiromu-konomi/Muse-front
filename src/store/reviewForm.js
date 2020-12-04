import { UPDATE_CURRENT, UPDATE_USER_NAME } from "@/mutation-types";
import axios from 'axios'

const reviewForm = {
    state: {
        music_data: [],
        current: null,
        userName: null,
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
        [UPDATE_USER_NAME](state, users) {
            state.userName = users;
            console.log("users=" + users);
        },
    },
    actions: {
        [UPDATE_CURRENT]({ commit }, music) {
            commit(UPDATE_CURRENT, music);
        },


        refresh: async function({ commit }, userNum) {
            const res = await axios.get('http://localhost:8080/postform', {
                params: {
                    userNum: userNum,
                }
            })
            this.userName = res.data
            console.log("userNum=" + this.userNum)
            console.info("userName=" + this.userName)
            commit(UPDATE_USER_NAME, this.userName)
        },

    },
};

export default reviewForm;