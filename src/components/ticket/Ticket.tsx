import { Ticket } from "@/types/ticket.types";
import { Person } from "@/types/person.types";
import { Device } from "@/types/device.types";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";

export default function TicketComponent({
  ticket,
  persons,
  devices,
  children,
}: {
  ticket: Ticket;
  persons: Person[];
  devices: Device[];
  children?: React.ReactNode;
}) {
  const assignedPerson = persons.find(
    (p) => p.id === ticket.assignedPersonId
  );

  const device = devices.find(
    (d) => d.id === ticket.deviceId
  );

  return (
    <Card>
      <CreatedAt date={ticket.createdAt} />

      <h2>{ticket.title}</h2>

      <p>{ticket.description}</p>

      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>

      <p>
        <strong>Zařízení:</strong>{" "}
        {device
          ? `${device.name} (${device.id})`
          : "Neznámé zařízení"}
      </p>

      <p>
        <strong>Přiřazeno:</strong>{" "}
        {assignedPerson
          ? `${assignedPerson.name} (${assignedPerson.id})`
          : "Neznámý uživatel"}
      </p>
      {children && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {children}
        </div>
      )}
    </Card>
  );
}