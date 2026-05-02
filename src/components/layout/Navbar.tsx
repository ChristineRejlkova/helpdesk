"use client";
import NavLink from "./NavLink";

export default function Navbar() {
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

      <NavLink href="/" text="HelpDesk" isLogo />

      <div style={{ display: "flex", gap: "20px" }}>
        <NavLink href="/" text="Home" />
        <NavLink href="/person" text="Osoby" />
        <NavLink href="/room" text="Místnosti" />
        <NavLink href="/device" text="Zařízení" />
        <NavLink href="/ticket" text="Tickety" />
        <NavLink href="/admin/login" text="Administrace" />
      </div>
    </nav>
  );
}