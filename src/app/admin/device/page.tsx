import Link from "next/link";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { ActionResult } from "@/types/actions.types";
import DeviceList from "@/components/device/DeviceList";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Admin – Zařízení",
  description: "Správa zařízení v systému",
};

export default async function AdminDevicesPage() {
  const devicesData: ActionResult<Device[]> = await getDevices();
  const roomsData: ActionResult<Room[]> = await getRooms();

  if (!devicesData.ok) {
    return <main>Chyba: {devicesData.message}</main>;
  }

  if (!roomsData.ok) {
    return <main>Chyba při načítání místností</main>;
  }

  const devices = devicesData.data ?? [];
  const rooms = roomsData.data ?? [];

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin – Zařízení
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <Link href="/admin/device/create">
            <Button>Vytvořit zařízení</Button>
          </Link>
        </div>

        <DeviceList
          devices={devices}
          rooms={rooms}
          isAdmin 
        />
      </div>
    </main>
  );
  
}