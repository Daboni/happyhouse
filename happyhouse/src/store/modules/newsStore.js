import {newslist} from "@/api/news";


const newsStore = {
  namespaced: true,
  state: {
    news: [],
    keyword: null,
  },
  mutations: {
    SET_NEWS: (state, news) => {
      console.log(news);
      state.news = news;
    },
    SET_KEYWORD: (state, keyword) => {
      state.keyword = keyword;
    },

  },
  actions: {
    async getNewsList({commit}, data) {
      await newslist(data ,
        response => {
        commit("SET_NEWS", response.data)
          if(data.keyword != null)  commit("SET_KEYWORD", data.keyword)
        }
        ,
        error => console.log(error)
        )

    },
  }

};

export default newsStore;
