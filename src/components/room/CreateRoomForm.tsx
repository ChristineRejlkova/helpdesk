"use client";

import { createRoom } from "@/utils/server/server-actions/updateCreate/room-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";

export default function CreateRoomForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [floor, setFloor] = useState<number>(0);

  return (
    <FormLayout title="Vytvořit místnost">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!name || floor === undefined) {
              alert("Vyplň všechna pole!");
              return;
            }

            startTransition(async () => {
              const res = await createRoom({
                name,
                floor,
              });

              if (res.ok) {
                setName("");
                setFloor(0);

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

          <Button type="submit">Vytvořit</Button>
        </form>
      </Card>
    </FormLayout>
  );
}
