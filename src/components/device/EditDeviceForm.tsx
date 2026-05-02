"use client";

import { Device, DeviceType } from "@/types/device.types";
import { Room } from "@/types/room.types";
import { editDevice } from "@/utils/server/server-actions/updateCreate/device-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";

export default function EditDeviceForm({
  device,
  rooms,
}: {
  device: Device & { id: string }; 
  rooms: Room[];
}) {
  const router = useRouter();

  const [name, setName] = useState(device.name);
  const [type, setType] = useState<DeviceType>(device.type);
  const [serialNumber, setSerialNumber] = useState(device.serialNumber);
  const [roomId, setRoomId] = useState(device.roomId);

  return (
    <FormLayout title="Upravit zařízení">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name || !serialNumber || !roomId) {
              alert("Vyplň všechna pole");
              return;
            }

            startTransition(async () => {
              const res = await editDevice({
                id: device.id,
                name,
                type,
                serialNumber,
                roomId,
              });

              if (res.ok) {
                router.push("/admin/device");
              } else {
                alert(res.message);
              }
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Název zařízení" 
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
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Sériové číslo" 
          />

          <Select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </Select>

          <Button type="submit">Uložit změny</Button>
        </form>
      </Card>
    </FormLayout>
  );
}