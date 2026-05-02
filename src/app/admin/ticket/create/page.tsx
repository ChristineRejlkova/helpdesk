import CreateTicketForm from "@/components/ticket/CreateTicketForm";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";

export const metadata = {
  title: "Vytvořit ticket | Admin",
  description: "Vytvoření nového ticketu.",
};
export default async function Page() {
  const devicesData = await getDevices();
  const personsData = await getPersons();

  if (!devicesData.ok || !personsData.ok) {
    return <main>Chyba při načítání dat</main>;
  }

  return (
    <CreateTicketForm
      devices={devicesData.data ?? []}
      persons={personsData.data ?? []}
    />
  );
}
