import EditPersonForm from "@/components/person/EditPersonForm";
import { getPerson } from "@/utils/server/server-actions/get/persons-action.get";

export const metadata = {
  title: "Upravit osobu | Admin",
  description: "Úprava osoby v systému.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
   const { id } = await params;

  const data = await getPerson(id);

  if (!data.ok || !data.data) {
    return <main>Osoba nenalezena</main>;
  }

  return <EditPersonForm person={data.data} />;
}
