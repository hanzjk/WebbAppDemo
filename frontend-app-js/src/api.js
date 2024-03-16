import { AxiosResponse } from "axios";
import { performRequestWithRetry } from "./retry";

export async function getBooks() {

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

 const options = {
    method: 'GET',
  };
  const response = await performRequestWithRetry(apiUrl+"/greeting", options);
  console.log(response);

  return response;
}


