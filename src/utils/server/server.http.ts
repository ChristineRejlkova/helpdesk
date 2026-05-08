"server-only";

import { AxiosRequestConfig } from "axios";
import { getAxiosInstance } from "./axios.instance";

export async function httpGet<TResponse>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  return await getAxiosInstance().get<TResponse>(url, options);
}

export async function httpPost<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await getAxiosInstance().post<TRequest, TResponse>(url, data, options);
}

export async function httpPatch<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await getAxiosInstance().patch<TRequest, TResponse>(url, data, options);
}

export async function httpPut<TRequest, TResponse = unknown>(
  url: string,
  data: TRequest,
  options: AxiosRequestConfig = {},
) {
  return await getAxiosInstance().put<TRequest, TResponse>(url, data, options);
}
export async function httpDelete<TResponse = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
) {
  return await getAxiosInstance().delete<TResponse>(url, options);
}

