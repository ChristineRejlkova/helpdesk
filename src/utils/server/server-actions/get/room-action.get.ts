"server-only";

import { Room } from "@/types/room.types";
import { ActionResult } from "@/types/actions.types";
import { AxiosResponse } from "axios";
import { httpGet } from "../../server.http";
import { ApiError } from "@/types/error.types";

export async function getRooms(): Promise<ActionResult<Array<Room>>> {
  try {
    const response: AxiosResponse<Array<Room>> =
      await httpGet<Array<Room>>("/room");

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

export async function getRoom(id: string): Promise<ActionResult<Room>> {
  try {
    const response: AxiosResponse<Room> =
      await httpGet<Room>(`/room/${id}`);

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