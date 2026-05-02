export default function CreatedAt({
  date,
}: {
  date?: string | Date;
}) {
  if (!date) return null;

  return (
    <span
      style={{
        position: "absolute",
        top: "10px",
        right: "15px",
        fontSize: "12px",
        color: "#555",
      }}
    >
      {new Date(date).toLocaleString("cs-CZ")}
    </span>
  );
}