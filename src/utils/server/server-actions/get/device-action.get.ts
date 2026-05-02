"server-only";

import { Device } from "@/types/device.types";
import { ActionResult } from "@/types/actions.types";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";
import { AxiosResponse } from "axios";
import { httpGet } from "../../server.http";
import { ApiError } from "@/types/error.types";
export async function getDevices(): Promise<ActionResult<Array<Device>>> {
  "use cache";
  cacheTag("devices");
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Array<Device>> =
      await httpGet<Array<Device>>("/device");

    if (response.status === 200) {
      return {
        ok: true,
        data: response.data,
      };
    } else {
      return {
        ok: false,
        message: `Unexpected status code: ${response.status}`,
        statusCode: response.status,
      };
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        message: err.message,
        statusCode: err.statusCode,
        retry: err.retry,
      };
    }

    console.error("Unexpected error:", err);

    return {
      ok: false,
      statusCode: 500,
      message: "An unexpected error occurred",
    };
  }
}

export async function getDevice(id: string): Promise<ActionResult<Device>> {
  "use cache";
  cacheTag(`device-${id}`); 
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Device> =
      await httpGet<Device>(`/device/${id}`);

    if (response.status === 200) {
      return {
        ok: true,
        data: response.data,
      };
    } else {
      return {
        ok: false,
        message: `Unexpected status code: ${response.status}`,
        statusCode: response.status,
      };
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        message: err.message,
        statusCode: err.statusCode,
        retry: err.retry,
      };
    }

    console.error("Unexpected error:", err);

    return {
      ok: false,
      statusCode: 500,
      message: "An unexpected error occurred",
    };
  }
}