import CreatePersonForm from "@/components/person/CreatePersonForm";
export const metadata = {
  title: "Vytvořit osobu | Admin",
  description: "Vytvoření nové osoby v systému.",
};
export default function PersonCreatePage() {
  return <CreatePersonForm />;
}
