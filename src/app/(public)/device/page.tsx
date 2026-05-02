import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { getDevices } from "@/utils/server/server-actions/get/device-action.get";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import { ActionResult } from "@/types/actions.types";
import DeviceList from "@/components/device/DeviceList";

export const metadata = {
  title: "Zařízení | HelpDesk",
  description: "Seznam zařízení v systému HelpDesk.",
};

export default async function DevicesPage() {
  const data: ActionResult<Device[]> = await getDevices();
  const roomsData: ActionResult<Room[]> = await getRooms();

  if (!data.ok) {
    return (
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1>Zařízení</h1>
        <p>Zařízení nejsou dostupná</p>
      </main>
    );
  }

  if (!roomsData.ok) {
    return (
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1>Zařízení</h1>
        <p>Místnosti nejsou dostupné</p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Zařízení</h1>

      <DeviceList
        devices={data.data ?? []}
        rooms={roomsData.data ?? []}
      />
    </main>
  );
}
