import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

async function sidoList(success, fail) {
  await api.get("/api/house/sido",).then(success).catch(fail);
}

async function gugunList(params, success, fail) {
  await api.get(`/api/house/gugun`, { params: params }).then(success).catch(fail);
}

async function dongList(params, success, fail) {
  await api.get(`/api/house/dong`, { params: params }).then(success).catch(fail);
}

async function houseList(params, success, fail) {
  await api.get(`/api/house/housedeal`, { params: params }).then(success).catch(fail);
}

async function houseListWithInterest(params, success, fail) {
  await api.get(`/api/house/housedeal/interest`, { params: params }).then(success).catch(fail);
}

async function interestList(params, success, fail) {
  await api.get(`/api/house/housedeal/interest/user`, { params: params }).then(success).catch(fail);
}

async function interestListWithPage(params, success, fail) {
  await api.get(`/api/house/housedeal/interest/userWithPage`, { params: params }).then(success).catch(fail);
}

async function houseListByAptName(aptName,params, success, fail) {
  await api.get(`/api/house/housedeal/${aptName}`, { params: params }).then(success).catch(fail);
}

async function saveInterest(interest, success, fail) {
  await api.post(`/api/house/housedeal/interest`, interest).then(success).catch(fail);
}

async function deleteInterest(interest, success, fail) {
  await api.delete(`/api/house/housedeal/interest`, {params :interest}).then(success).catch(fail);
}

async function monthlyPrice(aptName,params, success, fail) {
  await api.get(`/api/house/housedeal/${aptName}/monthly`, { params: params }).then(success).catch(fail);
}

async function schoolList(params, success, fail) {
  await api.get(`/api/school`,
    { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, dongList,houseList,houseListByAptName,
  monthlyPrice ,schoolList,houseListWithInterest,saveInterest, deleteInterest, interestList,
  interestListWithPage};
