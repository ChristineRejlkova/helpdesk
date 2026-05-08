"use client";

import NavLink from "./NavLink";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        <NavLink href="/" text="HelpDesk" isLogo />

        <div
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
        <div className={styles.menuDesktop}>
          <NavLink href="/" text="Home" />
          <NavLink href="/person" text="Osoby" />
          <NavLink href="/room" text="Místnosti" />
          <NavLink href="/device" text="Zařízení" />
          <NavLink href="/ticket" text="Tickety" />
          <NavLink href="/login" text="Administrace" />
        </div>
      </div>
      {open && (
        <div className={styles.menuMobile}>
          <NavLink href="/" text="Home" onClick={() => setOpen(false)} />
          <NavLink href="/person" text="Osoby" onClick={() => setOpen(false)} />
          <NavLink href="/room" text="Místnosti" onClick={() => setOpen(false)} />
          <NavLink href="/device" text="Zařízení" onClick={() => setOpen(false)} />
          <NavLink href="/ticket" text="Tickety" onClick={() => setOpen(false)} />
          <NavLink href="/admin/login" text="Administrace" onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}