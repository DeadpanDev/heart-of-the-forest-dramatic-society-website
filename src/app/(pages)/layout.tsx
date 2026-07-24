import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1">
        <div className="page-shell flex-1">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
