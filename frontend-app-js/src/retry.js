import axios, { AxiosRequestConfig } from 'axios';


export const performRequestWithRetry = async (url, options) => {

  try {
    const response = await axios(url, options);
    return response;
  } catch (error) {
      throw error; 
  }
};
