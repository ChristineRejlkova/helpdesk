"use client";

import { JobPosition } from "@/types/person.types";
import { createPerson } from "@/utils/server/server-actions/updateCreate/persons-action.update";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
export default function CreatePersonForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobPosition, setJobPosition] = useState<JobPosition>(
    JobPosition.STUDENT
  );

  return (
    <FormLayout title="Vytvořit osobu">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!name || !email) {
              alert("Vyplň všechna pole!");
              return;
            }

            startTransition(async () => {
              const res = await createPerson({
                name,
                email,
                jobPosition,
              });

              if (res.ok) {
                setName("");
                setEmail("");
                setJobPosition(JobPosition.STUDENT);

                router.push("/admin/person");
              } else {
                alert(res.message);
              }
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Input
            placeholder="Jméno"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Select
            value={jobPosition}
            onChange={(e) =>
              setJobPosition(e.target.value as JobPosition)
            }
          >
            <option value={JobPosition.STUDENT}>Student</option>
            <option value={JobPosition.TEACHER}>Učitel</option>
            <option value={JobPosition.TECHNICIAN}>Technik</option>
            <option value={JobPosition.ADMIN}>Admin</option>
          </Select>

          <Button type="submit">Vytvořit</Button>
        </form>
      </Card>
    </FormLayout>
  );
}