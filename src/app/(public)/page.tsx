import { getDevices } from "@/utils/server/server-actions/get/device-action.get"; 
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get"; 
import { getRooms } from "@/utils/server/server-actions/get/room-action.get"; 
import { getTickets } from "@/utils/server/server-actions/get/ticket-action.get";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
  title: "HelpDesk systém",
  description: "Systém pro správu osob, místností, zařízení a ticketů.",
};

export default async function Home() {
  const personsData = await getPersons();
  const roomsData = await getRooms();
  const devicesData = await getDevices();
  const ticketsData = await getTickets();

  const personsCount = personsData.ok ? personsData.data?.length ?? 0 : 0;
  const roomsCount = roomsData.ok ? roomsData.data?.length ?? 0 : 0;
  const devicesCount = devicesData.ok ? devicesData.data?.length ?? 0 : 0;
  const ticketsCount = ticketsData.ok ? ticketsData.data?.length ?? 0 : 0;

  return (
    <Dashboard
      title="HelpDesk systém"
      description={
        <>
          Tento systém slouží ke správě osob, místností,
          zařízení a ticketů.
          <br />
          Pokud chceš vytvářet nebo upravovat data,
          přihlas se do administrace.
        </>
      }
      cards={[
        { title: "Osoby", count: personsCount, link: "/person" },
        { title: "Místnosti", count: roomsCount, link: "/room" },
        { title: "Zařízení", count: devicesCount, link: "/device" },
        { title: "Tickety", count: ticketsCount, link: "/ticket" },
      ]}
    />
  );
}