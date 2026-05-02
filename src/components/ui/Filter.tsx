export default function FilterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#9EE1E5",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
  
}