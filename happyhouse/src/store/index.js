import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import houseStore from "@/store/modules/houseStore";
import memberStore from "@/store/modules/memberStore";
import newsStore from "@/store/modules/newsStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    houseStore: houseStore,
    memberStore: memberStore,
    newsStore: newsStore,
  },
  plugins: [ createPersistedState({
    paths: ["memberStore", "newsStore"],
  }),
  ],

});

export default store;

