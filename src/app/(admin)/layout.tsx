export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark relative text-foreground flex min-h-screen bg-background">
      <div className="page-shell flex-1">{children}</div>
    </div>
  );
}
