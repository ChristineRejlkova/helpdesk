import CreateRoomForm from "@/components/room/CreateRoomForm";

export const metadata = {
  title: "Vytvořit místnost | Admin",
  description: "Vytvoření nové místnosti.",
};

export default function Page() {
  return <CreateRoomForm />;
}
