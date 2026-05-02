"use client";

import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket.types";
import { Device } from "@/types/device.types";
import { Person } from "@/types/person.types";
import { editTicket } from "@/utils/server/server-actions/updateCreate/ticket-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea"; 
import FormLayout from "@/components/ui/FormLayout";

export default function EditTicketForm({
  ticket,
  devices,
  persons,
}: {
  ticket: Ticket;
  devices: Device[];
  persons: Person[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState<TicketStatus>(
    ticket.status as TicketStatus
  );
  const [priority, setPriority] = useState<TicketPriority>(
    ticket.priority as TicketPriority
  );
  const [deviceId, setDeviceId] = useState(ticket.deviceId);
  const [assignedPersonId, setAssignedPersonId] = useState(
    ticket.assignedPersonId
  );

  return (
    <FormLayout title="Upravit ticket">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            startTransition(async () => {
              const updatedTicket: Ticket = {
                id: ticket.id,
                title,
                description,
                status,
                priority,
                deviceId,
                assignedPersonId,
              };

              const res = await editTicket(updatedTicket);

              if (res.ok) {
                router.push("/admin/ticket");
              } else {
                alert(`Chyba: ${res.message}`);
              }
            });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Input
            placeholder="Název"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Popis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
          >
            <option value={TicketStatus.OPEN}>OPEN</option>
            <option value={TicketStatus.IN_PROGRESS}>IN PROGRESS</option>
            <option value={TicketStatus.DONE}>DONE</option>
          </Select>

          <Select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TicketPriority)
            }
          >
            <option value={TicketPriority.LOW}>LOW</option>
            <option value={TicketPriority.MEDIUM}>MEDIUM</option>
            <option value={TicketPriority.HIGH}>HIGH</option>
          </Select>

          <Select
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>

          <Select
            value={assignedPersonId}
            onChange={(e) =>
              setAssignedPersonId(e.target.value)
            }
          >
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Button type="submit">Uložit změny</Button>
        </form>
      </Card>
    </FormLayout>
  );
}