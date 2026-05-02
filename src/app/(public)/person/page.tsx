import { Person } from "@/types/person.types";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";
import { ActionResult } from "@/types/actions.types";
import PersonList from "@/components/person/PersonList";

export const metadata = {
  title: "Osoby | HelpDesk",
  description: "Seznam osob v systému HelpDesk.",
};
export default async function PersonsPage() {
  const data: ActionResult<Person[]> = await getPersons();

  if (!data.ok) {
    return (
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        
        <h1>Osoby</h1>
        <p>Uživatelé nejsou dostupní</p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Osoby</h1>

      <PersonList persons={data.data ?? []} />
    </main>
  );
}