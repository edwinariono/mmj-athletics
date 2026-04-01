import { MessageCircle, Shirt, Users, TrendingUp, Package, Download } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { mockEnquiries, mockProducts } from "@/lib/mock-data";
import { ENQUIRY_STATUSES } from "@/lib/constants";

export default function AdminDashboard() {
  const totalEnquiries = mockEnquiries.length;
  const jerseyEnquiries = mockEnquiries.filter((e) => e.type === "jersey").length;
  const teamEnquiries = mockEnquiries.filter((e) => e.type === "team").length;
  const wonEnquiries = mockEnquiries.filter((e) => e.status === "won").length;
  const conversionRate =
    totalEnquiries > 0 ? Math.round((wonEnquiries / totalEnquiries) * 100) : 0;

  // Funnel data
  const funnelData = Object.entries(ENQUIRY_STATUSES).map(([key, { label }]) => ({
    status: label,
    count: mockEnquiries.filter((e) => e.status === key).length,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wider">
          Dashboard
        </h1>
        <a
          href="/api/export"
          className="inline-flex items-center gap-2 bg-ice-blue/10 text-ice-blue hover:bg-ice-blue/20 px-4 py-2 text-xs font-label font-semibold uppercase tracking-wider rounded-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Enquiry Bulan Ini"
          value={totalEnquiries}
          icon={MessageCircle}
          color="bg-wa-green"
        />
        <StatCard
          label="Enquiry Jersey"
          value={jerseyEnquiries}
          icon={Shirt}
          color="bg-mmj-red"
        />
        <StatCard
          label="Enquiry Tim"
          value={teamEnquiries}
          icon={Users}
          color="bg-yellow-500"
        />
        <StatCard
          label="Konversi"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          color="bg-ice-blue"
        />
      </div>

      {/* Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-admin-surface border border-border rounded-sm p-5">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4">
            Funnel Enquiry
          </h2>
          <div className="space-y-3">
            {funnelData.map((item) => {
              const maxCount = Math.max(...funnelData.map((d) => d.count), 1);
              const width = Math.max((item.count / maxCount) * 100, 8);
              return (
                <div key={item.status} className="flex items-center gap-3">
                  <span className="text-xs font-label font-semibold uppercase tracking-wider text-muted w-24 shrink-0">
                    {item.status}
                  </span>
                  <div className="flex-1 bg-bg rounded-sm overflow-hidden h-7">
                    <div
                      className="h-full bg-ice-blue/20 flex items-center px-2"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-xs font-bold text-ice-blue">
                        {item.count}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-admin-surface border border-border rounded-sm p-5">
          <h2 className="font-label font-semibold text-sm uppercase tracking-wider text-muted mb-4">
            Produk Paling Ditanyakan
          </h2>
          <div className="space-y-3">
            {mockProducts.slice(0, 5).map((product, i) => (
              <div
                key={product.id}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <span className="w-6 h-6 bg-ice-blue/10 flex items-center justify-center text-xs font-bold text-ice-blue rounded-sm shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{product.name}</p>
                  <p className="text-xs text-muted">{product.brand}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <Package className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 10) + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
