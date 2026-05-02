"use client";

import NavLink from "./NavLink";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#028090",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <NavLink href="/admin" text="HelpDesk Admin" isLogo />

      <div style={{ display: "flex", gap: "20px" }}>
        <NavLink href="/admin" text="Home" />
        <NavLink href="/admin/person" text="Osoby" />
        <NavLink href="/admin/room" text="Místnosti" />
        <NavLink href="/admin/device" text="Zařízení" />
        <NavLink href="/admin/ticket" text="Tickety" />
        <NavLink text="Odhlásit se" onClick={handleLogout} />
      </div>
    </nav>
  );
}