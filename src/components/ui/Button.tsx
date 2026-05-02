"use client";

export default function Button({
  children,
  style,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseColor = style?.backgroundColor || "#028090";

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        backgroundColor: baseColor,
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...style, 
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.filter = "brightness(0.9)"; 
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
      }}
    >
      {children}
    </button>
  );
}