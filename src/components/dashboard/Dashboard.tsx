import DashboardCard from "@/components/dashboard/DashboardCard";

export default function Dashboard({
  title,
  description,
  cards,
}: {
  title: string;
  description: React.ReactNode;
  cards: {
    title: string;
    count: number;
    link: string;
  }[];
}) {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "32px" }}>
        {title}
      </h1>

      <p style={{ marginBottom: "30px" }}>{description}</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <DashboardCard
            key={card.link}
            title={card.title}
            count={card.count}
            link={card.link}
          />
        ))}
      </div>
    </main>
  );
}