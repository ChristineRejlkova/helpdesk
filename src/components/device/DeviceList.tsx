"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Device } from "@/types/device.types";
import { Room } from "@/types/room.types";
import DeviceComponent from "./Device";
import FilterBar from "@/components/ui/Filter";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteDevice } from "@/utils/server/server-actions/delete/device-action.delete";

export default function DeviceList({
  devices,
  rooms,
  isAdmin = false,
}: {
  devices: Device[];
  rooms: Room[];
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.id?.toLowerCase().includes(search.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      !typeFilter || device.type === typeFilter;

    const matchesRoom =
      !roomFilter || device.roomId === roomFilter;

    return matchesSearch && matchesType && matchesRoom;
  });

  return (
    <div>
      <FilterBar>
        <Input
          placeholder="Hledat název, ID nebo SN..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(input);
              setTypeFilter(typeInput);
              setRoomFilter(roomInput);
            }
          }}
        />

        <Select
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
        >
          <option value="">Typ</option>
          <option value="PC">PC</option>
          <option value="NOTEBOOK">Notebook</option>
          <option value="PRINTER">Printer</option>
          <option value="OTHER">Other</option>
        </Select>

        <Select
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
        >
          <option value="">Místnost</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </Select>

        <Button
          onClick={() => {
            setSearch(input);
            setTypeFilter(typeInput);
            setRoomFilter(roomInput);
          }}
        >
          Hledat
        </Button>

        <Button
          onClick={() => {
            setInput("");
            setSearch("");
            setTypeInput("");
            setTypeFilter("");
            setRoomInput("");
            setRoomFilter("");
          }}
        >
          Reset
        </Button>
      </FilterBar>

      {filteredDevices.map((device) => {
        const detailHref = isAdmin
          ? `/admin/device/${device.id}`
          : `/device/${device.id}`;

        return (
          <div key={device.id}>
            <div
              onClick={() => router.push(detailHref)}
              style={{ cursor: "pointer" }}
            >
              <DeviceComponent device={device} rooms={rooms}>
                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <Link href={`/admin/device/update/${device.id}`}>
                      <Button>Upravit</Button>
                    </Link>

                    <DeleteButton
                      id={device.id!}
                      action={deleteDevice}
                      confirmText="Opravdu chceš smazat zařízení?"
                    />
                  </div>
                )}
              </DeviceComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
}