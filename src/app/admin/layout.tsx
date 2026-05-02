import AdminNavbar from "@/components/layout/AdminNavbar";
import AdminFooter from "@/components/layout/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />

      <main style={{ padding: "30px", minHeight: "80vh" }}>
        {children}
      </main>

      <AdminFooter />
    </>
  );
}
