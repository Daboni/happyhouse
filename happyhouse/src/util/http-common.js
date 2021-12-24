import axios from "axios";

const apiURL = "http://118.222.22.199:8080";
// const apiURL = "http://localhost:8080";

export default axios.create({
  baseURL: apiURL,
  headers: {
    "Content-type": "application/json",
  },
});
