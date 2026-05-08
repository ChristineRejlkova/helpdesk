"use client";

import NavLink from "./NavLink";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function AdminNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#028090",
        padding: "15px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink href="/admin" text="HelpDesk Admin" isLogo />
        <div
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
        <div className={styles.menuDesktop}>
          <NavLink href="/admin" text="Home" />
          <NavLink href="/admin/person" text="Osoby" />
          <NavLink href="/admin/room" text="Místnosti" />
          <NavLink href="/admin/device" text="Zařízení" />
          <NavLink href="/admin/ticket" text="Tickety" />
          <NavLink text="Odhlásit se" onClick={handleLogout} />
        </div>
      </div>
      {open && (
        <div className={styles.menuMobile}>
          <NavLink href="/admin" text="Home" onClick={() => setOpen(false)} />
          <NavLink href="/admin/person" text="Osoby" onClick={() => setOpen(false)} />
          <NavLink href="/admin/room" text="Místnosti" onClick={() => setOpen(false)} />
          <NavLink href="/admin/device" text="Zařízení" onClick={() => setOpen(false)} />
          <NavLink href="/admin/ticket" text="Tickety" onClick={() => setOpen(false)} />
          <NavLink text="Odhlásit se" onClick={() => { handleLogout(); setOpen(false); }} />
        </div>
      )}
    </nav>
  );
}