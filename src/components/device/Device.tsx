import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
export default function DeviceComponent({
  device,
  rooms,
  children,
}: {
  device: Device;
  rooms: Room[];
  children?: React.ReactNode;
}) {
  const room = rooms.find((r) => r.id === device.roomId);

  return (
    <Card>
      <CreatedAt date={device.createdAt} />

      <h2>{device.name} ({device.id})</h2>
      <p><strong>Typ:</strong> {device.type}</p>
      <p><strong>SN:</strong> {device.serialNumber}</p>

      <p>
        <strong>Místnost:</strong>{" "}
        {room ? `${room.name} (${room.id})` : "Neznámá"}
      </p>
      {children && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {children}
        </div>
      )}
    </Card>
  );
}