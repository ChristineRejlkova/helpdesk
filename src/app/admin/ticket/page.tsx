import Link from "next/link";
import { getTickets } from "@/utils/server/server-actions/get/ticket-action.get";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { Ticket } from "@/types/ticket.types";
import { Person } from "@/types/person.types";
import { Device } from "@/types/device.types";
import { ActionResult } from "@/types/actions.types";
import TicketList from "@/components/ticket/TicketList";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Admin – Tickety",
  description: "Správa ticketů v systému",
};

export default async function AdminTicketsPage() {
  const ticketsData: ActionResult<Ticket[]> = await getTickets();
  const personsData: ActionResult<Person[]> = await getPersons();
  const devicesData: ActionResult<Device[]> = await getDevices();

  if (!ticketsData.ok) {
    return <main>Chyba: {ticketsData.message}</main>;
  }

  const tickets = ticketsData.data ?? [];
  const persons = personsData.data ?? [];
  const devices = devicesData.data ?? [];

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin – Tickety
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <Link href="/admin/ticket/create">
            <Button>Vytvořit ticket</Button>
          </Link>
        </div>

        <TicketList
          tickets={tickets}
          persons={persons}
          devices={devices}
          isAdmin
        />
      </div>
    </main>
  );
}
