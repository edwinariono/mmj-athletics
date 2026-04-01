import { Sidebar } from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-64">
        <header className="h-16 border-b border-border bg-admin-surface flex items-center px-6">
          <div className="lg:hidden w-10" />
          <h1 className="font-label font-semibold text-sm uppercase tracking-wider text-muted">
            Admin Panel
          </h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
