"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavLink({
  href,
  text,
  isLogo = false,
  onClick,
}: {
  href?: string;
  text: string;
  isLogo?: boolean;
  onClick?: () => void;
}) {
  
  const [hover, setHover] = useState(false);

  const style = {
    color: hover ? "#ffffff" : "black",
    textDecoration: "none",
    fontWeight: isLogo ? "bold" : "normal",
    fontSize: isLogo ? "20px" : "16px",
    transition: "color 0.2s ease",
    cursor: "pointer",
  };
  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={style}
      >
        {text}
      </Link>
    );
  }
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
    >
      {text}
    </span>
  );
}