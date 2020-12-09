import axios from 'axios'

const groupDetail = {
    state: {
        groupData: {
            groupId: undefined,
            groupName: undefined,
            groupDescription: undefined,
            ownerName: undefined,
        }
    },
    mutations: {
        setGroupData(state, resData) {
            state.groupData.groupId = resData.groupId;
            state.groupData.groupName = resData.groupName;
            state.groupData.ownerName = resData.ownerName;
        },
    },
    actions: {
        async setGroupData({commit}, { groupName, userNum }) {
            await axios.get("http://localhost:8080/showGroup", {
                params: {
                    groupName: groupName,
                    userNum: userNum,
                }
            })
            .then((response) => {
                commit("setGroupData", response.data);
            })
            .catch((reason) => console.log(reason));
        },
    }
}

export default groupDetail