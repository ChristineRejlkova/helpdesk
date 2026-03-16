import PersonComponent from "@/components/person/Person";
import { Person } from "@/types/person.types";
import { getPersons } from "@/utils/server/server-actions/get/persons-action.get";
import { ActionResult } from "@/types/person-actions.types";
import Link from "next/link";

export default async function Home() {
  let persons: Array<Person> = [];
  const data: ActionResult<Array<Person>> = await getPersons();

  // TODO: Vyřešit lépe error handling
  if (!data.ok) {
    return (
      <main>
        Uživatelé nejsou dostupní ({data.message}) {data.retry} s!
      </main>
    );
  } else {
    persons = data.data ?? [];
  }

  return (
    <main>
      <h1>Uživatelé</h1>

      {persons.map((person) => (
        <PersonComponent key={person.id} person={person} />
      ))}

      <Link href="/person/create">Přidat uživatele</Link>
    </main>
  );
}
