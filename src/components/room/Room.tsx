import { Room } from "@/types/room.types";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";

export default function RoomComponent({
  room,
  children,
}: {
  room: Room;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CreatedAt date={room.createdAt} />

      <h2>{room.name} ({room.id})</h2>

      <p><strong>Patro:</strong> {room.floor}</p>
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