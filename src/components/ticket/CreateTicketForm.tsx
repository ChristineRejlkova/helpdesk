"use client";

import {TicketStatus,TicketPriority,} from "@/types/ticket.types";
import { Device } from "@/types/device.types";
import { Person } from "@/types/person.types";
import { createTicket } from "@/utils/server/server-actions/updateCreate/ticket-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import Textarea from "../ui/Textarea";

export default function CreateTicketForm({
  devices,
  persons,
}: {
  devices: Device[];
  persons: Person[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.OPEN);
  const [priority, setPriority] = useState<TicketPriority>(
    TicketPriority.MEDIUM
  );
  const [deviceId, setDeviceId] = useState("");
  const [assignedPersonId, setAssignedPersonId] = useState("");

  return (
    <FormLayout title="Vytvořit ticket">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!title || !description || !deviceId || !assignedPersonId) {
              alert("Vyplň všechna pole!");
              return;
            }

            startTransition(async () => {
              const res = await createTicket({
                title,
                description,
                status,
                priority,
                deviceId,
                assignedPersonId,
              });

              if (res.ok) {
                setTitle("");
                setDescription("");
                setDeviceId("");
                setAssignedPersonId("");
                setStatus(TicketStatus.OPEN);
                setPriority(TicketPriority.MEDIUM);

                router.push("/admin/ticket");
              } else {
                alert(res.message);
              }
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
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
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            <option value={TicketPriority.LOW}>LOW</option>
            <option value={TicketPriority.MEDIUM}>MEDIUM</option>
            <option value={TicketPriority.HIGH}>HIGH</option>
          </Select>

          <Select
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          >
            <option value="">Vyber zařízení</option>
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>

          <Select
            value={assignedPersonId}
            onChange={(e) => setAssignedPersonId(e.target.value)}
          >
            <option value="">Vyber osobu</option>
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Button type="submit">Vytvořit</Button>
        </form>
      </Card>
    </FormLayout>
  );
}

