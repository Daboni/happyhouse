import {apiInstance, postInstance} from "./index.js";

const api = apiInstance();
const postApi = postInstance();
async function newslist(params,success,fail){
  // console.log(params);
  await api.get(`/api/news`,{params:params}).then(success).catch(fail);
}

async function trendsList(data,success,fail){
  // console.log(params);
  await postApi.post(`/api/trends`,data).then(success).catch(fail);
}

export { newslist, trendsList};
