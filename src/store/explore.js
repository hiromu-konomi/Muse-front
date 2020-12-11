import axios from 'axios';

const explore = {
    state: {
        postId: "",
    },
    mutations: {
        getPostId(state, postId) {
            console.log("getPostId=" + postId);
            state.postId = postId;
        },
    },
    actions: {
        postSearchText: async function({ commit }, search_post) {
            console.log("search_post=" + search_post);
            await axios
                .get('http://localhost:8080/searchPost', {
                    params: {
                    searchPost: search_post
                    }
                })
                .then((postId) => {
                    console.log("postId=" + postId.data);
                    commit("getPostId", postId.data);
                })
                .catch((reason) => console.log(reason));
        },
    }
};

export default explore;