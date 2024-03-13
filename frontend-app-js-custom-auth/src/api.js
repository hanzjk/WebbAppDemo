import { AxiosResponse } from "axios";
import { getReadingListInstance } from "./instance";

export async function getBooks(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await getReadingListInstance().get("/greeting", {
    headers: headers,
  });
  return response;
}
