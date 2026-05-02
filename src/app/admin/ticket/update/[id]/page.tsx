import EditTicketForm from "@/components/ticket/EditTicketForm";
import { getTicket } from "@/utils/server/server-actions/get/ticket-action.get";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";

export const metadata = {
  title: "Upravit ticket | Admin",
  description: "Úprava ticketu v systému.",
};
export default async function Page({
  params,
}: {
 params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const ticketData = await getTicket(id);
  const devicesData = await getDevices();
  const personsData = await getPersons();

  if (!ticketData.ok || !ticketData.data) {
    return <main>Ticket nenalezen</main>;
  }


  return (
    <EditTicketForm
      ticket={ticketData.data}
      devices={devicesData.data ?? []}
      persons={personsData.data ?? []}
    />
  );
}