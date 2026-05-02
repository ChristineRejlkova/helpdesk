import { getRoom } from "@/utils/server/server-actions/get/room-action.get";
import EditRoomForm from "@/components/room/EditRoomForm";

export const metadata = {
  title: "Upravit místnost | Admin",
  description: "Úprava místnosti v systému.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
 const { id } = await params;

  const data = await getRoom(id);

  if (!data.ok || !data.data) {
    return <main>Místnost nenalezena</main>;
  }

  return <EditRoomForm room={data.data} />;
}