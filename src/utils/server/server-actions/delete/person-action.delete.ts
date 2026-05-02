"use server";

import { ActionResult } from "../../../../types/actions.types";
import { httpDelete } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";

export async function deletePerson(id: string): Promise<ActionResult<null>> {
  try {
    const response = await httpDelete(`/person/${id}`);

    if (response.status === 200 || response.status === 204) {
      revalidateTag("persons", "max");
      revalidateTag(`person-${id}`, "max");

      return {
        ok: true,
        message: "Person deleted",
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
      message: "Unexpected error",
    };
  }
}