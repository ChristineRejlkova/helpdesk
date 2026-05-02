import { Ticket } from "@/types/ticket.types";
import { getTickets } from "@/utils/server/server-actions/get/ticket-action.get";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";
import { ActionResult } from "@/types/actions.types";
import TicketList from "@/components/ticket/TicketList";

export const metadata = {
  title: "Tickety | HelpDesk",
  description: "Seznam ticketů v systému HelpDesk.",
};

export default async function TicketsPage() {
  const data: ActionResult<Ticket[]> = await getTickets();
  const devicesData = await getDevices();
  const personsData = await getPersons();

  const devices = devicesData.ok ? devicesData.data ?? [] : [];
  const persons = personsData.ok ? personsData.data ?? [] : [];

  if (!data.ok) {
    return (
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Tickety</h1>
        <p>Tickety nejsou dostupné</p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Tickety</h1>

      <TicketList
        tickets={data.data ?? []}
        persons={persons}
        devices={devices}
      />
    </main>
  );
  
}