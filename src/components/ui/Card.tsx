export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#9EE1E5",
        padding: "25px",
        marginBottom: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
