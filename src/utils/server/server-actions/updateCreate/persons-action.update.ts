"use server";

import { Person } from "@/types/person.types";
import { ActionResult } from "../../../../types/actions.types";
import { AxiosResponse } from "axios";
import { httpPatch, httpPost } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";
export async function createPerson(data: Person): Promise<ActionResult<Person>> {
  try {
    const response = await httpPost<Person, AxiosResponse<Person>>(
      "/person",
      data
    );

    if (response.status === 201) {
      revalidateTag("persons", "max");

      if (response.data?.id) {
        revalidateTag(`person-${response.data.id}`, "max");
      }

      return {
        ok: true,
        message: "Person created successfully",
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

export async function editPerson(
  id: string,
  data: Omit<Person, "id">
): Promise<ActionResult<Person>> {
  try {
    const response = await httpPatch<
      Omit<Person, "id">,
      AxiosResponse<Person>>(`/person/${id}`, data);

    if (response.status === 200) {
      revalidateTag("persons", "max");
      revalidateTag(`person-${id}`, "max");

      return {
        ok: true,
        message: "Person updated successfully",
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