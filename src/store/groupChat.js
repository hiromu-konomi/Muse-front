import axios from 'axios'

const groupChat = {
    state: {
        chatDatas: [],
    },
    getters: {
        showChats: (state, getters) => {
            let showChats = [];

            for (var chat of state.chatDatas) {
                chat.photo = getters.getUserPhotobyUserNum(
                    chat.userNum
                ).downloadURL;
                console.log("chat.photo = " + chat.photo)
                showChats.push(chat)
            }

            return showChats;
        }
    },
    mutations: {
        setChatDatas(state, resData) {
            state.chatDatas = resData.groupChats;
        }
    },
    actions: {
        async setChatDatas({commit}, groupId) {
            await axios.get("http://localhost:8080/showChats", {
                params: {
                    groupId: groupId
                }
            })
            .then((response) => {
                commit("setChatDatas", response.data);
            })
            .catch((reason) => console.log(reason));
        }
    },
}

export default groupChat