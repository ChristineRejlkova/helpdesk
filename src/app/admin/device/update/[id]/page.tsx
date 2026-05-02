import { getDevice } from "@/utils/server/server-actions/get/device-action.get";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import EditDeviceForm from "@/components/device/EditDeviceForm";
import { Device } from "@/types/device.types";

export const metadata = {
  title: "Upravit zařízení | Admin",
  description: "Úprava zařízení v systému.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const deviceData = await getDevice(id);
  const roomsData = await getRooms();

  if (!deviceData.ok || !deviceData.data) {
    return <main>Zařízení nenalezeno</main>;
  }

  if (!roomsData.ok || !roomsData.data) {
    return <main>Místnosti nenalezeny</main>;
  }

  return (
    <EditDeviceForm
      device={deviceData.data as Device & { id: string }} 
      rooms={roomsData.data}
    />
  );
}