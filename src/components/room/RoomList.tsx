"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Room } from "@/types/room.types";
import RoomComponent from "./Room";
import FilterBar from "@/components/ui/Filter";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DeleteButton from "@/components/ui/DeleteButton";
import { deleteRoom } from "@/utils/server/server-actions/delete/room-action.delete";

export default function RoomList({
  rooms,
  isAdmin = false,
}: {
  rooms: Room[];
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [floorInput, setFloorInput] = useState("");
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("");

  const floors = [...new Set(rooms.map((r) => r.floor))].sort(
    (a, b) => a - b
  );

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.id?.toLowerCase().includes(search.toLowerCase());

    const matchesFloor =
      !floorFilter || room.floor.toString() === floorFilter;

    return matchesSearch && matchesFloor;
  });

  return (
    <div>
      <FilterBar>
        <Input
          placeholder="Hledat místnost nebo ID..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(input);
              setFloorFilter(floorInput);
            }
          }}
        />

        <Select
          value={floorInput}
          onChange={(e) => setFloorInput(e.target.value)}
        >
          <option value="">Patro</option>
          {floors.map((floor) => (
            <option key={floor} value={floor}>
              {floor}. patro
            </option>
          ))}
        </Select>

        <Button
          onClick={() => {
            setSearch(input);
            setFloorFilter(floorInput);
          }}
        >
          Hledat
        </Button>

        <Button
          onClick={() => {
            setInput("");
            setSearch("");
            setFloorInput("");
            setFloorFilter("");
          }}
        >
          Reset
        </Button>
      </FilterBar>

      {filteredRooms.map((room) => {
        const detailHref = isAdmin
          ? `/admin/room/${room.id}`
          : `/room/${room.id}`;

        return (
          <div key={room.id}>
  
            <div
              onClick={() => router.push(detailHref)}
              style={{ cursor: "pointer" }}
            >
              <RoomComponent room={room}>
                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={`/admin/room/update/${room.id}`}>
                      <Button>Upravit</Button>
                    </Link>

                    <DeleteButton
                      id={room.id!}
                      action={deleteRoom}
                      confirmText="Opravdu chceš smazat místnost?"
                    />
                  </div>
                )}
              </RoomComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
}