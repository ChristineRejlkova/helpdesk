import { getRoom } from "@/utils/server/server-actions/get/room-action.get";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
import Button from "@/components/ui/Button";
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

          <div style={{ marginTop: "20px" }}>
            <Link href="/room">
              <Button>Zpět</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}