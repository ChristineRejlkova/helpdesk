"use server";

import { Person } from "@/types/person.types";
import { httpGet, httpPost } from "../server.http";
import { ApiError } from "@/types/error.types";
import { AxiosResponse } from "axios";

export type ActionResult<TData = unknown> = {
  ok: boolean;
  data?: TData;
  message?: string;
  statusCode?: number;
  retry?: number;
};

export async function getPersons(): Promise<ActionResult<Array<Person>>> {
  try {
    const response: AxiosResponse<Array<Person>> =
      await httpGet<Array<Person>>("/person");

    return {
      ok: true,
      data: response.data,
    };
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

export async function createPerson(
  data: Person,
): Promise<ActionResult<Person>> {
  try {
    const response = await httpPost<Person, AxiosResponse<Person>>(
      "/person",
      data,
    );

    console.log(response);

    return {
      ok: true,
      message: "Person created successfully",
      data: response.data,
    };
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
