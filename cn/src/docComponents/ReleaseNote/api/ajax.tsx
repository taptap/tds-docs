import axios, { AxiosResponse } from "axios";

interface AjaxResponse {
  [key: string]: any;
}

export default function ajax(url: string, data: object = {}, method: string = "GET"): Promise<AjaxResponse> {
  return new Promise<AjaxResponse>((resolve, reject) => {
    let promise: Promise<AxiosResponse>;

    if (method === "GET") {
      promise = axios.get(url, {
        params: data
      });
    } else {
      promise = axios.post(url, data);
    }

    promise
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
