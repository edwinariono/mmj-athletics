import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "ice" | "red" | "green" | "yellow";
  className?: string;
}

const variantStyles = {
  default: "bg-white/10 text-white",
  ice: "bg-ice-blue/20 text-ice-blue",
  red: "bg-mmj-red/20 text-mmj-red",
  green: "bg-wa-green/20 text-wa-green",
  yellow: "bg-yellow-500/20 text-yellow-400",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-label font-semibold uppercase tracking-wider rounded-sm",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
