"use server";

import { Ticket } from "@/types/ticket.types";
import { ActionResult } from "../../../../types/actions.types";
import { AxiosResponse } from "axios";
import { httpPatch, httpPost } from "../../server.http";
import { ApiError } from "@/types/error.types";
import { revalidateTag } from "next/cache";

export async function createTicket(data: Ticket): Promise<ActionResult<Ticket>> {
  try {
    const response = await httpPost<Ticket, AxiosResponse<Ticket>>(
      "/ticket",
      data
    );

    if (response.status === 201) {
      revalidateTag("tickets", "max");

      if (response.data?.id) {
        revalidateTag(`ticket-${response.data.id}`, "max");
      }

      return {
        ok: true,
        message: "Ticket created successfully",
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

export async function editTicket(data: Ticket): Promise<ActionResult<Ticket>> {
  try {
    const { id, ...body } = data;

    const response = await httpPatch<Ticket, AxiosResponse<Ticket>>(
      `/ticket/${id}`,
      body
    );

    if (response.status === 200) {
      revalidateTag("tickets", "max");
      revalidateTag(`ticket-${id}`, "max");

      return {
        ok: true,
        message: "Ticket updated successfully",
        data: response.data,
      };
    }

    return {
      ok: false,
      message: `Unexpected status code: ${response.status}`,
      statusCode: response.status,
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