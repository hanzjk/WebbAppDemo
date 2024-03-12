import { AxiosResponse } from "axios";
import { performRequestWithRetry } from "./retry";

export async function getBooks() {

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
console.log(apiUrl);
 const options = {
    method: 'GET',
  };

  const response = await performRequestWithRetry(apiUrl, options);
  console.log(response);

  return response;
}


