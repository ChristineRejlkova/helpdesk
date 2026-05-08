"use client";
import NavLink from "./NavLink";

export default function Footer() {
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
        <NavLink href="/" text="Home" />
        <NavLink href="/person" text="Osoby" />
        <NavLink href="/room" text="Místnosti" />
        <NavLink href="/device" text="Zařízení" />
        <NavLink href="/ticket" text="Tickety" />
        <NavLink href="/login" text="Administrace" />
      </div>

      <p
        style={{
          marginTop: "15px",
          fontSize: "12px",
          color: "black",
        }}
      >
        © 2026 HelpDesk systém
      </p>
    </footer>
  );
}
