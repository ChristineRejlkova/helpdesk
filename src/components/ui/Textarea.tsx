"use client";

export default function Textarea({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        minHeight: "80px",
        resize: "vertical",
        ...props.style, 
      }}
      onFocus={(e) =>
        (e.target.style.border = "1px solid #028090")
      }
      onBlur={(e) =>
        (e.target.style.border = "1px solid #ccc")
      }
    />
  );
}