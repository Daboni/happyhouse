const chatStore = {
  namespaced: true,
  state: {
    messageList:[]
  },
  getters: {},
  mutations: {
    SET_MESSAGE_LIST: (state,messageList) => {
      state.meesgaeList = messageList;
    },
  },
  actions: {
    setMessageList: ({ commit }, messageList) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_MESSAGE_LIST", messageList);
    },
  },
};

export default chatStore;
