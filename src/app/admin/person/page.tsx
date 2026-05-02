import Link from "next/link";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";
import { Person } from "@/types/person.types";
import { ActionResult } from "@/types/actions.types";
import PersonList from "@/components/person/PersonList";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Admin – Osoby",
  description: "Správa osob v systému",
};

export default async function AdminPersonsPage() {
  const data: ActionResult<Person[]> = await getPersons();

  if (!data.ok) {
    return <main>Chyba: {data.message}</main>;
  }

  const persons = data.data ?? [];

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin – Osoby
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <Link href="/admin/person/create">
            <Button>Vytvořit osobu</Button>
          </Link>
        </div>

        <PersonList persons={persons} isAdmin />
      </div>
    </main>
  );
  
}