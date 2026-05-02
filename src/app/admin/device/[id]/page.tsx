import { getDevice } from "@/utils/server/server-actions/get/device-action.get";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteDevice } from "@/utils/server/server-actions/delete/device-action.delete";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const deviceData = await getDevice(id);
  const roomsData = await getRooms();

  if (!deviceData.ok || !deviceData.data) {
    return <main>Zařízení nenalezeno</main>;
  }

  const device = deviceData.data;
  const room = roomsData.data?.find((r) => r.id === device.roomId);

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "600px" }}>
        <Card>
          <CreatedAt date={device.createdAt} />

          <h1>{device.name}</h1>

          <p><strong>ID:</strong> {device.id}</p>
          <p><strong>Typ:</strong> {device.type}</p>
          <p><strong>SN:</strong> {device.serialNumber}</p>
          <p><strong>Místnost:</strong> {room?.name ?? "Neznámá"}</p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="/admin/device">
              <Button>Zpět</Button>
            </Link>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link href={`/admin/device/update/${device.id}`}>
                <Button>Upravit</Button>
              </Link>

              <DeleteButton
                id={device.id!}
                action={deleteDevice}
                confirmText="Opravdu chceš smazat zařízení?"
              />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}