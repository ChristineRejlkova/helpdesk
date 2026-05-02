"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Person, JobPosition } from "@/types/person.types";
import PersonComponent from "./Person";
import FilterBar from "@/components/ui/Filter";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DeleteButton from "@/components/ui/DeleteButton";
import { deletePerson } from "@/utils/server/server-actions/delete/person-action.delete";

export default function PersonList({
  persons,
  isAdmin = false,
}: {
  persons: Person[];
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [jobInput, setJobInput] = useState("");
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  const filteredPersons = persons.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase()) ||
      p.studentId?.toLowerCase().includes(search.toLowerCase());

    const matchesJob =
      !jobFilter || p.jobPosition === jobFilter;

    return matchesSearch && matchesJob;
  });

  return (
    <div>
      <FilterBar>
        <Input
          placeholder="Hledat jméno, ID..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(input);
              setJobFilter(jobInput);
            }
          }}
        />

        <Select
          value={jobInput}
          onChange={(e) => setJobInput(e.target.value)}
        >
          <option value="">Pozice</option>
          <option value={JobPosition.STUDENT}>Student</option>
          <option value={JobPosition.TEACHER}>Teacher</option>
          <option value={JobPosition.TECHNICIAN}>Technician</option>
          <option value={JobPosition.ADMIN}>Admin</option>
        </Select>

        <Button
          onClick={() => {
            setSearch(input);
            setJobFilter(jobInput);
          }}
        >
          Hledat
        </Button>

        <Button
          onClick={() => {
            setInput("");
            setSearch("");
            setJobInput("");
            setJobFilter("");
          }}
        >
          Reset
        </Button>
      </FilterBar>

      {filteredPersons.map((person) => {
        const detailHref = isAdmin
          ? `/admin/person/${person.id}`
          : `/person/${person.id}`;

        return (
          <div key={person.id}>
            <div
              onClick={() => router.push(detailHref)}
              style={{ cursor: "pointer" }}
            >
              <PersonComponent person={person}>
                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={`/admin/person/update/${person.id}`}>
                      <Button>Upravit</Button>
                    </Link>

                    <DeleteButton
                      id={person.id!}
                      action={deletePerson}
                      confirmText="Opravdu chceš smazat osobu?"
                    />
                  </div>
                )}
              </PersonComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
}