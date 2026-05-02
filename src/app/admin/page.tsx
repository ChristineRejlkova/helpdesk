import { getDevices } from "@/utils/server/server-actions/get/device-action.get"; 
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get"; 
import { getRooms } from "@/utils/server/server-actions/get/room-action.get"; 
import { getTickets } from "@/utils/server/server-actions/get/ticket-action.get";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
  title: "Admin Dashboard | HelpDesk",
  description: "Přehled administrace systému HelpDesk.",
};

export default async function AdminPage() {
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
      title="Admin"
      description="Tento systém slouží ke upravování osob, místností, zařízení a ticketů."
      cards={[
        { title: "Osoby", count: personsCount, link: "/admin/person" },
        { title: "Místnosti", count: roomsCount, link: "/admin/room" },
        { title: "Zařízení", count: devicesCount, link: "/admin/device" },
        { title: "Tickety", count: ticketsCount, link: "/admin/ticket" },
      ]}
    />
  );
}
