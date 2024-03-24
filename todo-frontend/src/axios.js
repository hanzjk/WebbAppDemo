import axios from "axios";


const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

console.log(apiUrl);
const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;
