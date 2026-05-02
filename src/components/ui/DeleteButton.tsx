"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Button from "@/components/ui/Button";
import { ActionResult } from "@/types/actions.types";

export default function DeleteButton({
  id,
  action,
  confirmText = "Opravdu chceš smazat položku?",
}: {
  id: string;
  action: (id: string) => Promise<ActionResult<unknown>>; 
  confirmText?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (!confirm(confirmText)) return;

    setLoading(true);

    startTransition(async () => {
      const res = await action(id);

      if (res.ok) {
        router.refresh();
      } else {
        alert("Chyba: " + res.message);
      }

      setLoading(false);
    });
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading} 
      style={{ backgroundColor: "#d9534f" }} 
    >
      {loading ? "Mazání..." : "Smazat"}
    </Button>
  );
}