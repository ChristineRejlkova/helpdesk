"server-only";

import { Ticket } from "@/types/ticket.types";
import { ActionResult } from "@/types/actions.types";
import { cacheTag, cacheLife } from "next/cache";
import { AxiosResponse } from "axios";
import { httpGet } from "../../server.http";
import { ApiError } from "@/types/error.types";
export async function getTickets(): Promise<ActionResult<Array<Ticket>>> {
  "use cache";
  cacheTag("tickets");
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Array<Ticket>> =
      await httpGet<Array<Ticket>>("/ticket");

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

export async function getTicket(id: string): Promise<ActionResult<Ticket>> {
  "use cache";
  cacheTag(`ticket-${id}`); 
  cacheLife({ revalidate: 300, expire: 3600 });

  try {
    const response: AxiosResponse<Ticket> =
      await httpGet<Ticket>(`/ticket/${id}`);

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