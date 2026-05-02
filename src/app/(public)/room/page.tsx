import { Room } from "@/types/room.types";
import { getRooms } from "@/utils/server/server-actions/get/room-action.get";
import { ActionResult } from "@/types/actions.types";
import RoomList from "@/components/room/RoomList";

export const metadata = {
  title: "Místnosti | HelpDesk",
  description: "Seznam místností v systému HelpDesk.",
};

export default async function RoomsPage() {
  const data: ActionResult<Room[]> = await getRooms();

  if (!data.ok) {
    return (
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1>Místnosti</h1>
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
      <h1 style={{ marginBottom: "20px" }}>Místnosti</h1>

      <RoomList rooms={data.data ?? []} />
    </main>
  );
}
