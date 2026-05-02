import { Person } from "@/types/person.types";
import Card from "@/components/ui/Card";
import CreatedAt from "@/components/ui/CreatedAt";

export default function PersonComponent({
  person,
  children,
}: {
  person: Person;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CreatedAt date={person.createdAt} />

      <h2>
        {person.name} ({person.id})
      </h2>

      <p><strong>Email:</strong> {person.email}</p>
      <p><strong>Pozice:</strong> {person.jobPosition}</p>

      {person.studentId && (
        <p><strong>Student ID:</strong> {person.studentId}</p>
      )}


      {children && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {children}
        </div>
      )}
    </Card>
  );
}