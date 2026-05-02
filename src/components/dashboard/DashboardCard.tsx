"use client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardCard({
  title,
  count,
  link,
}: {
  title: string;
  count: number;
  link: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: hover ? "#7ED4D9" : "#9EE1E5",
          padding: "30px",
          borderRadius: "12px",
          width: "200px",
          cursor: "pointer",
          transition: "0.2s",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</p>
      </div>
    </Link>
  );
}