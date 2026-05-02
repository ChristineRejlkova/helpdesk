import { getPerson } from "@/utils/server/server-actions/get/persons-action.get";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getPerson(id);

  if (!data.ok || !data.data) {
    return <main>Osoba nenalezena</main>;
  }

  const person = data.data;

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "600px" }}>
        <Card>
          <CreatedAt date={person.createdAt} />

          <h1>{person.name}</h1>

          <p><strong>ID:</strong> {person.id}</p>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Pozice:</strong> {person.jobPosition}</p>

          {person.studentId && (
            <p><strong>Student ID:</strong> {person.studentId}</p>
          )}

          <div style={{ marginTop: "20px" }}>
            <Link href="/person">
              <Button>Zpět</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
