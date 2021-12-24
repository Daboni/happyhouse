import jwt_decode from "jwt-decode";
import {login, updateImg, updateUser} from "@/api/member.js";
import { findByEmail } from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },

  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        async (response) => {
          console.log(response);

          if (response.data.response === "success") {
            alert("로그인 성공");
            let token = response.data.data;
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);

          } else {
            alert("이메일이나 비밀번호가 올바르지 않습니다.")
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        (error) => {console.log(error)}
      );


    },
    async getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      await findByEmail(
        decode_token.username,
        (response) => {
          if (response.data.response === "success") {
            console.log("인증 성공", response);
            commit("SET_USER_INFO", response.data.data);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyUserInfo({ commit }, user) {

      await updateUser(
        user,
        (response) => {
          console.log("변경성공", response);
          commit("SET_USER_INFO", response.data);

        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyProfileImg({ commit }, userid,img) {

      await updateImg(
        userid,
        img,
        (response) => {
          console.log("이미지 변경 성공", response);
          commit("SET_USER_INFO", response.data);

        },
        (error) => {
          console.log("이미지 변경 실패");
          console.log(error);
        }
      );
    },

    logout({ commit }){
      console.log("Hi");
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      //localStorage.removeItem("vuex");
      sessionStorage.removeItem("access-token");
    }
  },
};

export default memberStore;
