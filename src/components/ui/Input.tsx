"use client";

export default function Input({
  style,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.border = "1px solid #028090";
      }}
      onBlur={(e) => {
        e.currentTarget.style.border = "1px solid #ccc";
      }}
    />
  );
}