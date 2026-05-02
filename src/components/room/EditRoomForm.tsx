"use client";

import { Room } from "@/types/room.types";
import { editRoom } from "@/utils/server/server-actions/updateCreate/room-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";

export default function EditRoomForm({ room }: { room: Room }) {
  const router = useRouter();

  const [name, setName] = useState(room.name);
  const [floor, setFloor] = useState<number>(room.floor);

  return (
    <FormLayout title="Upravit místnost">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!name || floor === undefined) {
              alert("Vyplň všechna pole!");
              return;
            }

            startTransition(async () => {
              const res = await editRoom({
                id: room.id,
                name,
                floor,
              });

              if (res.ok) {
                router.push("/admin/room");
              } else {
                alert(res.message);
              }
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Input
            placeholder="Název"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Patro"
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
          />

          <Button type="submit">Uložit změny</Button>
        </form>
      </Card>
    </FormLayout>
  );
}
