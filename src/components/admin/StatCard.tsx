import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-admin-surface border border-border rounded-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-label font-semibold uppercase tracking-wider text-muted mb-2">
            {label}
          </p>
          <p className="text-3xl font-heading font-bold">{value}</p>
        </div>
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center clip-corner-sm",
            color
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
