import CreateDeviceForm from "@/components/device/CreateDeviceForm";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";

export const metadata = {
  title: "Vytvořit zařízení | Admin",
  description: "Přidání nového zařízení.",
};
export default async function Page() {
  const roomsData = await getRooms();

  if (!roomsData.ok || !roomsData.data) {
    return <main>Chyba při načítání místností</main>;
  }

  return <CreateDeviceForm rooms={roomsData.data} />;
}
