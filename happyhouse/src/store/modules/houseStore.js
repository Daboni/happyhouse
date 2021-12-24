import http from "@/util/http-common";
import {
  dongList,
  gugunList,
  houseList,
  houseListByAptName,
  houseListWithInterest, interestList, interestListWithPage,
  monthlyPrice,
  schoolList,
  sidoList,
} from "@/api/house";

const houseStore ={
  namespaced: true,
  state: {
    sidos : [],
    guguns : [],
    dongs: [],
    sidoCode: null,
    gugunCode: null,
    dongName: null,
    houseDeals : [],
    houseDealDetails : [],
    schoolList : [],
    pagination : { totalPageCount : 0},
    interestList:[],
    houseDealsMonthly:[],
  },
  getters: {
    aptList(state){

      // return state.houseDeals.map( (housedeal) => {
      //   const aptData = {
      //     aptName: housedeal.aptName,
      //     dealAmount: housedeal.dealAmount.trim(),
      //     area: housedeal.area,
      //     date:
      //       housedeal.dealYear +
      //       "." +
      //       housedeal.dealMonth +
      //       "." +
      //       housedeal.dealDay,
      //     lat: housedeal.lat,
      //     lng: housedeal.lng,
      //   }
      //   return aptData;
      // })
      return state.houseDeals;
    },
    pagination(state){
      return state.pagination;
    },

  },
  mutations: {
    SET_SIDO(state, sidos){
      state.sidos = sidos;
    },
    SET_GUGUN(state, data){
      state.guguns = data.guguns;
      state.sidoCode = data.sidoCode;
    },
    SET_DONG(state, data){
      state.dongs = data.dongs;
      state.gugunCode = data.gugunCode;
    },
    SET_DEAL(state, data){
      console.log("아파트정보와 페이지 네이션",data);
      state.houseDeals = data.deals;
      state.dongName = data.dongName;
      state.pagination = data.pagination
    },
    SET_HOUSE_DEAL(state, data){
      state.houseDeals = data;
    },
    SET_HOUSE_DEAL_MONTHLY(state, data){
      state.houseDealsMonthly = data;
    },
    SET_DEAL_DETAIL(state, data){
      console.log("아파트 거래정보와 페이지 네이션",data);
      state.houseDealDetails = data.deals;
      state.dongName = data.dongName;
      state.pagination = data.pagination
    },
    SET_SCHOOL_LIST(state, data){
      state.schoolList= data;
      console.log(data);
    },
    SET_INTEREST_LIST(state, data){
      state.interestList = data;
    },
    SET_INTEREST_LIST_PAGE(state, data){
      console.log(data)
      state.interestList = data.list;
      state.pagination = data.pagination;
    },
    CLEAR_HOUSEDEAL(state){
      state.houseDeals = [];
    }

  },
  actions: {
    getSido({ commit }) {
      sidoList(
        (response)=>{
          console.log(response.data);
          commit("SET_SIDO", response.data)
        },
        (error) => console.log(error)
      )
      commit("CLEAR_HOUSEDEAL");

    },
    //도/광역시가 선택되면, 시/군/구 데이터를 얻어와서, 시/군/구 select 박스 생성
    async getGugun({ commit }, sidoCode) {

      gugunList(
        {
          "sido":sidoCode
        },
        (response) =>{
          const guguns = {
            "guguns" : response.data,
            sidoCode
          }
          commit("SET_GUGUN",guguns);
        },
        (error) => console.log(error)
      )

    },
    async getDong({ commit }, gugunCode) {
      dongList({
        "gugun":gugunCode
      },
        (response) => {
            const dongs = {
              "dongs" : response.data,
              gugunCode
            }
            commit("SET_DONG", dongs);
      },
        (error) => console.log(error)
        )


    },
    async getDeal({ commit }, data) {

      await houseList({
        "code" : data.gugunCode,
        "dong" : data.dongName,
      },
        (response) =>{
          if(response.status ===204){
            alert("거래 정보가 없습니다.")
            const deals = {
              "deals" : [],
              "dongName" :data.dongName,
              "pagination" : { totalPageCount : 0},
            }
            commit("SET_DEAL", deals);
          } else {
            const deals = {
              "deals": response.data.list,
              "dongName": data.dongName,
              "pagination": response.data.pagination,
            }
            commit("SET_DEAL", deals);
          }
        },
        (error) => {console.log(error)}
        )

    },
    async getDealWithInterest({ commit }, data) {

      await houseListWithInterest({
          "code" : data.gugunCode,
          "dong" : data.dongName,
          "seq" : data.seq,
        },
        (response) =>{
          if(response.status ===204){
            alert("거래 정보가 없습니다.")
            const deals = {
              "deals" : [],
              "dongName" :data.dongName,
              "pagination" : { totalPageCount : 0},
            }
            commit("SET_DEAL", deals);
          } else {
            const deals = {
              "deals": response.data.list,
              "dongName": data.dongName,
              "pagination": response.data.pagination,
            }
            commit("SET_DEAL", deals);
          }
        },
        (error) => {console.log(error)}
      )

    },
    async getDealByAptName({ commit }, data) {

      console.log(data);
      await houseListByAptName(data.aptName, {
        "code" : data.gugunCode,
        "dong" : data.dongName,
        "currentPage" : data.currentPage,
        "sizePerPage" : data.sizePerPage,
      },
        response => {
          const deals = {
            "deals" : response.data.list,
            "dongName" :data.dongName,
            "pagination" : response.data.pagination,
          }
          commit("SET_DEAL_DETAIL", deals);
        },
        error => console.log(error))


    },
    async getMonthlyPrice({ commit }, data) {

      console.log(data);
      await monthlyPrice(data.aptName, {
          "code" : data.gugunCode,
          "dong" : data.dongName,
        },
        response => {
          if(response.status ===204){
            alert("거래 정보가 없습니다.")
            commit("SET_HOUSE_DEAL_MONTHLY", []);
          } else {
            commit("SET_HOUSE_DEAL_MONTHLY", response.data);
          }
        },
        error => console.log(error))


    },
    async getSchoolList({ commit }, data) {

      console.log("SchoolList",data);
      await schoolList({
        "gugunCode": data.gugunCode,
        "dongName" : data.dongName,
      },
        (response) =>       commit("SET_SCHOOL_LIST", response.data),
        error => console.log(error)
        )

    },
    async getInterestList({commit}, data){
      await interestList(
        data,
        (response) => commit("SET_INTEREST_LIST", response.data),
        error => console.log(error)
      )
    },
    async getInterestListWithPage({commit}, data){
      await interestListWithPage(
        data,
        (response) => commit("SET_INTEREST_LIST_PAGE", response.data),
        error => console.log(error)
      )
    },
  },

};

export default houseStore;
