import axios from "axios";

let accessToken = localStorage.getItem("token");

export default axios.create({
  baseURL: `${process.env.VUE_APP_ROOT_API}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`
  }
});
