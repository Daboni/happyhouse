import axios from "axios";
import { API_BASE_URL, APT_DEAL_URL } from "@/config";


// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

// axios 객체 생성
function memberInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true});
  return instance;
}
function fileInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  }
);
  return instance;
}

// axios 객체 생성
function postInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true});
  return instance;
}


function houseInstance() {
  const instance = axios.create({
    baseURL: APT_DEAL_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, houseInstance, memberInstance,postInstance, fileInstance};
