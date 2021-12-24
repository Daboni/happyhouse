import { apiInstance } from "./index.js";

const api = apiInstance();

async function commentlist(params,success,fail){
  // console.log(params);
  await api.get(`/api/comment`,{params:params}).then(success).catch(fail);
}
function commentwrite(comment,success,fail){
  console.log(JSON.stringify(comment));
  api.post(`/api/comment`, JSON.stringify(comment)).then(success).catch(fail);
}
async function commentview(no, success, fail) {
  await api.get(`/api/comment/${no}`).then(success).catch(fail);
}
function commentdelete(no, success, fail) {
  api.delete(`/api/comment/${no}`).then(success).catch(fail);
}
function commentmodify(comment, success, fail) {
  api.put(`/api/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

export { commentlist, commentwrite, commentview, commentdelete, commentmodify };
