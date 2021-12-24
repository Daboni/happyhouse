import { apiInstance } from "./index.js";

const api = apiInstance();

async function postlist(params,success,fail){
  await api.get(`/api/board`,{params:params}).then(success).catch(fail);
}
async function postlistbykeyword(params,success,fail){
  console.log(params);
  await api.get(`/api/board/`, {params:params}).then(success).catch(fail);
}
function postwrite(post,success,fail){
  console.log(JSON.stringify(post));
  api.post(`/api/board`, JSON.stringify(post)).then(success).catch(fail);
}
async function postview(postno, success, fail) {
  await api.get(`/api/board/${postno}`).then(success).catch(fail);
}
function postdelete(postno, success, fail) {
  api.delete(`/api/board/${postno}`).then(success).catch(fail);
}
function postmodify(post, success, fail) {
  api.put(`/api/board`, JSON.stringify(post)).then(success).catch(fail);
}

export { postlist, postwrite, postview, postdelete, postmodify, postlistbykeyword };
