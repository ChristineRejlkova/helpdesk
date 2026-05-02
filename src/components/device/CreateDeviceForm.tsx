"use client";

import { DeviceType } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { createDevice } from "@/utils/server/server-actions/updateCreate/device-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
export default function CreateDeviceForm({ rooms }: { rooms: Room[] }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState<DeviceType>(DeviceType.PC);
  const [serialNumber, setSerialNumber] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <FormLayout title="Vytvořit zařízení">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!name || !serialNumber || !roomId) {
              alert("Vyplň všechna pole!");
              return;
            }

            startTransition(async () => {
              const res = await createDevice({
                name,
                type,
                serialNumber,
                roomId,
              });

              if (res.ok) {
                setName("");
                setSerialNumber("");
                setRoomId("");
                setType(DeviceType.PC);

                router.push("/admin/device");
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

          <Select
            value={type}
            onChange={(e) => setType(e.target.value as DeviceType)}
          >
            <option value={DeviceType.PC}>PC</option>
            <option value={DeviceType.NOTEBOOK}>Notebook</option>
            <option value={DeviceType.PRINTER}>Tiskárna</option>
            <option value={DeviceType.OTHER}>Jiné</option>
          </Select>

          <Input
            placeholder="Serial Number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />

          <Select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">Vyber místnost</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </Select>

          <Button type="submit">Vytvořit</Button>
        </form>
      </Card>
    </FormLayout>
  );
}