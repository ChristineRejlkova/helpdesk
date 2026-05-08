"server-only";

import { ApiError } from "@/types/error.types";
import axios, { type AxiosError, type AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

function requireEnv(): { API_URL: string; API_KEY: string } {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;

  if (!API_KEY || !API_URL) {
    throw new Error("Env variables don't exist");
  }

  return { API_URL, API_KEY };
}

export function getAxiosInstance(): AxiosInstance {
  if (axiosInstance) {
    return axiosInstance;
  }

  const { API_URL, API_KEY } = requireEnv();

  axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      const response = err.response;
      if (!response) throw new ApiError({ message: "Network error" });

      const retryAfter = response.headers?.["retry-after"] as string | undefined;

      let retry: number | undefined = undefined;

      if (typeof retryAfter === "string") retry = Number(retryAfter);

      const data = response.data as { message?: string; error?: string };

      throw new ApiError({
        statusCode: response.status,
        message: data.message ?? data.error ?? response.statusText,
        retry,
      });
    },
  );

  return axiosInstance;
}
