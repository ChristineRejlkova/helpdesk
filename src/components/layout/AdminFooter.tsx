"use client";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";

export default function AdminFooter() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  return (
    <footer
      style={{
        backgroundColor: "#028090",
        padding: "20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <NavLink href="/admin" text="Home" />
        <NavLink href="/admin/person" text="Osoby" />
        <NavLink href="/admin/room" text="Místnosti" />
        <NavLink href="/admin/device" text="Zařízení" />
        <NavLink href="/admin/ticket" text="Tickety" />
        <NavLink text="Odhlásit se" onClick={handleLogout} />
      </div>

      <p
        style={{
          marginTop: "15px",
          fontSize: "12px",
          color: "black",
        }}
      >

        © 2026 HelpDesk Admin
      </p>
    </footer>
  );
}