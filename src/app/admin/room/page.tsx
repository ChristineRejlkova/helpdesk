import Link from "next/link";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import { Room } from "@/types/room.types";
import { ActionResult } from "@/types/actions.types";
import RoomList from "@/components/room/RoomList";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Admin – Místnosti",
  description: "Správa místností v systému",
};

export default async function AdminRoomsPage() {
  const data: ActionResult<Room[]> = await getRooms();

  if (!data.ok) {
    return <main>Chyba: {data.message}</main>;
  }

  const rooms = data.data ?? [];

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin – Místnosti
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <Link href="/admin/room/create">
            <Button>Vytvořit místnost</Button>
          </Link>
        </div>

        <RoomList rooms={rooms} isAdmin />
      </div>
    </main>
  );
}
