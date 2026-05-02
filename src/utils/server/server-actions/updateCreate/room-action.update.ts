"use server";

import { Room } from "@/types/room.types";
import { ActionResult } from "../../../../types/actions.types";
import { AxiosResponse } from "axios";
import { httpPatch, httpPost } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";

export async function createRoom(data: Room): Promise<ActionResult<Room>> {
  try {
    const response = await httpPost<Room, AxiosResponse<Room>>(
      "/room",
      data
    );

    if (response.status === 201) {
      revalidateTag("rooms", "max");

      if (response.data?.id) {
        revalidateTag(`room-${response.data.id}`, "max");
      }

      return {
        ok: true,
        message: "Room created successfully",
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

export async function editRoom(data: Room): Promise<ActionResult<Room>> {
  try {
    const { id, ...body } = data;

    const response = await httpPatch<Room, AxiosResponse<Room>>(
      `/room/${id}`,
      body
    );

    if (response.status === 200) {
      revalidateTag("rooms", "max");
      revalidateTag(`room-${id}`, "max");

      return {
        ok: true,
        message: "Room updated successfully",
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