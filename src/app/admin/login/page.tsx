"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormLayout from "@/components/ui/FormLayout";
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Vyplň email a heslo");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    router.push("/admin");
  };

  return (
    <FormLayout title="Přihlášení do administrace">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px", 
          }}
        >

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">
            Přihlásit se
          </Button>
        </form>
      </Card>
    </FormLayout>
  );
}