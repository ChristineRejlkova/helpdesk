
import { getTicket } from "@/utils/server/server-actions/get/ticket-action.get";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";

import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteTicket } from "@/utils/server/server-actions/delete/ticket-action.delete";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticketData = await getTicket(id);
  const devicesData = await getDevices();
  const personsData = await getPersons();

  if (!ticketData.ok || !ticketData.data) {
    return <main>Ticket nenalezen</main>;
  }

  const ticket = ticketData.data;

  const device = devicesData.data?.find(
    (d) => d.id === ticket.deviceId
  );

  const person = personsData.data?.find(
    (p) => p.id === ticket.assignedPersonId
  );

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "600px" }}>
        <Card>
          <CreatedAt date={ticket.createdAt} />

          <h1>{ticket.title}</h1>

          <p>{ticket.description}</p>

          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Priority:</strong> {ticket.priority}</p>

          <p>
            <strong>Zařízení:</strong>{" "}
            {device ? device.name : "Neznámé"}
          </p>

          <p>
            <strong>Přiřazeno:</strong>{" "}
            {person ? person.name : "Neznámý"}
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="/admin/ticket">
              <Button>Zpět</Button>
            </Link>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link href={`/admin/ticket/update/${ticket.id}`}>
                <Button>Upravit</Button>
              </Link>

              <DeleteButton
                id={ticket.id!}
                action={deleteTicket}
                confirmText="Opravdu chceš smazat ticket?"
              />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}