import {apiInstance, memberInstance, fileInstance} from "./index.js";

const baseApi = apiInstance();
const fileApi = fileInstance();
const memberApi = memberInstance();

async function login(user, success, fail) {
  await memberApi.post(`/member/login`, user).then(success).catch(fail);
}

async function findByEmail(userid, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  // api.defaults.headers.common["x-access-token"] = sessionStorage.getItem("access-token");
  console.log(document.cookie);

  await memberApi.get(`/member/info/${userid}`).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  await memberApi.put(`/member`, user).then(success).catch(fail);
}

function updateImg(userid, img, success, fail) {
  fileApi.post(`/member/img/${userid}`, img,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findByEmail, updateUser,updateImg };
