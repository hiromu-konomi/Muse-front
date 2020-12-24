import axios from 'axios'

// グループ詳細画面に関するストア
const groupDetail = {
    state: {
        // グループ情報
        groupData: {
            groupId: undefined,
            groupName: undefined,
            groupDescription: undefined,
            ownerId: undefined,
            // ユーザーのグループ参加状況（１：参加済, ２：招待済, undefined：不参加）
            joinStatus: undefined,
        },
    },
    mutations: {
        setGroupData(state, resData) {
            state.groupData.groupId = resData.groupId;
            state.groupData.groupName = resData.groupName;
            state.groupData.ownerId = resData.ownerId;
            state.groupData.joinStatus = resData.joinStatus;
        },

        setJoinStatus(state, resData) {
            state.groupData.joinStatus = resData;
        },

        setGrpDes(state, resData) {
            state.groupData.groupDescription = resData;
        },

        setShowGroup(state, resData) {
            state.groupData.groupId = resData.groupId;
            state.groupData.groupName = resData.groupName;
            state.groupData.ownerId = resData.ownerId;
            state.groupData.joinStatus = resData.joinStatus;
            state.groupData.groupDescription = resData.groupDescription;
        }
    },
    actions: {
        async setGroupData({ commit }, { userNum, groupName, inviteUsers }) {
            var qs = require('qs');
            await axios.get("http://localhost:8080/createGroup", {
                    params: {
                        userNum: userNum,
                        groupName: groupName,
                        inviteUsers: inviteUsers
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: "repeat" })
                    }
                })
                .then((response) => {
                    commit("setGroupData", response.data);
                })
                .catch((reason) => console.log(reason));
        },

        async setJoinStatus({ commit }, {userNum, groupId}) {
            await axios.get("http://localhost:8080/setJoinStatus", {
                    params: {
                        userNum: userNum,
                        groupId: groupId
                    }
                })
                .then((response) => {
                    commit("setJoinStatus", response.data);
                })
                .catch((reason) => console.log(reason));
        },

        async setGrpDes({ commit }, { groupDes, groupId }) {
            await axios.get("http://localhost:8080/setGrpDes", {
                    params: {
                        groupDescription: groupDes,
                        groupId: groupId
                    }
                })
                .then((response) => {
                    commit("setGrpDes", response.data);
                })
                .catch((reason) => console.log(reason));
        },

        async setShowGroup({ commit }, { groupId, userNum }) {
            await axios.get("http://localhost:8080/showGroup", {
                    params: {
                        groupId: groupId,
                        userNum: userNum
                    }
                })
                .then((response) => {
                    commit("setShowGroup", response.data)
                })
                .catch((reason) => console.log(reason));
        }
    }
}

export default groupDetail