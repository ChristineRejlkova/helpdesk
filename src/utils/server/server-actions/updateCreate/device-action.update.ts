"use server";

import { Device } from "@/types/device.types";
import { ActionResult } from "../../../../types/actions.types";
import { AxiosResponse } from "axios";
import { httpPatch, httpPost } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";
export async function createDevice(data: Device): Promise<ActionResult<Device>> {
  try {
    const response = await httpPost<Device, AxiosResponse<Device>>(
      "/device",
      data
    );

    if (response.status === 201) {
      revalidateTag("devices", "max");
      if (response.data?.id) {
        revalidateTag(`device-${response.data.id}`, "max");
      }

      return {
        ok: true,
        message: "Device created successfully",
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

export async function editDevice(data: Device): Promise<ActionResult<Device>> {
  try {
    const { id, ...body } = data;

    const response = await httpPatch<Device, AxiosResponse<Device>>(
      `/device/${id}`,
      body
    );

    if (response.status === 200) {
      revalidateTag("devices", "max");
      revalidateTag(`device-${id}`, "max");

      return {
        ok: true,
        message: "Device updated successfully",
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

    return {
      ok: false,
      statusCode: 500,
      message: "An unexpected error occurred",
    };
  }
}