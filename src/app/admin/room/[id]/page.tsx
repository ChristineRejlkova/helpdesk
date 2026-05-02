import { getRoom } from "@/utils/server/server-actions/get/room-action.get";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteRoom } from "@/utils/server/server-actions/delete/room-action.delete";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getRoom(id);

  if (!data.ok || !data.data) {
    return <main>Místnost nenalezena</main>;
  }

  const room = data.data;

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "600px" }}>
        <Card>
          <CreatedAt date={room.createdAt} />

          <h1>{room.name}</h1>

          <p><strong>ID:</strong> {room.id}</p>
          <p><strong>Patro:</strong> {room.floor}</p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="/admin/room">
              <Button>Zpět</Button>
            </Link>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link href={`/admin/room/update/${room.id}`}>
                <Button>Upravit</Button>
              </Link>

              <DeleteButton
                id={room.id!}
                action={deleteRoom}
                confirmText="Opravdu chceš smazat místnost?"
              />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}