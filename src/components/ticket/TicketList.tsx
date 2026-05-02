"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket.types";
import { Person } from "@/types/person.types";
import { Device } from "@/types/device.types";
import TicketComponent from "./Ticket";
import FilterBar from "@/components/ui/Filter";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteTicket } from "@/utils/server/server-actions/delete/ticket-action.delete";

export default function TicketList({
  tickets,
  persons,
  devices,
  isAdmin = false,
}: {
  tickets: Ticket[];
  persons: Person[];
  devices: Device[];
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || ticket.status === statusFilter;

    const matchesPriority =
      !priorityFilter || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div>
      <FilterBar>
        <Input
          placeholder="Hledat ticket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={statusInput}
          onChange={(e) => setStatusInput(e.target.value)}
        >
          <option value="">Status</option>
          <option value={TicketStatus.OPEN}>OPEN</option>
          <option value={TicketStatus.IN_PROGRESS}>IN PROGRESS</option>
          <option value={TicketStatus.DONE}>DONE</option>
        </Select>

        <Select
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
        >
          <option value="">Priority</option>
          <option value={TicketPriority.LOW}>LOW</option>
          <option value={TicketPriority.MEDIUM}>MEDIUM</option>
          <option value={TicketPriority.HIGH}>HIGH</option>
        </Select>

        <Button
          onClick={() => {
            setStatusFilter(statusInput);
            setPriorityFilter(priorityInput);
          }}
        >
          Hledat
        </Button>

        <Button
          onClick={() => {
            setSearch("");
            setStatusInput("");
            setPriorityInput("");
            setStatusFilter("");
            setPriorityFilter("");
          }}
        >
          Reset
        </Button>
      </FilterBar>

      {filteredTickets.map((ticket) => {
        const detailHref = isAdmin
          ? `/admin/ticket/${ticket.id}`
          : `/ticket/${ticket.id}`;

        return (
          <div key={ticket.id}>
            <div
              onClick={() => router.push(detailHref)}
              style={{ cursor: "pointer" }}
            >
              <TicketComponent
                ticket={ticket}
                persons={persons}
                devices={devices}
              >
                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={`/admin/ticket/update/${ticket.id}`}>
                      <Button>Upravit</Button>
                    </Link>

                    <DeleteButton
                      id={ticket.id!}
                      action={deleteTicket}
                      confirmText="Opravdu chceš smazat ticket?"
                    />
                  </div>
                )}
              </TicketComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
}