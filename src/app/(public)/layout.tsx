import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main style={{ padding: "30px", minHeight: "80vh" }}>
        {children}
      </main>

      <Footer />
    </>
  );
}
