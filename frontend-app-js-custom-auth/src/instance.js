import axios from "axios";

export const getReadingListInstance = () => {
  return axios.create({ baseURL: window.configs.apiUrl });
};
