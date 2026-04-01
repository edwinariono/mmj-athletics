import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-sm clip-corner-md",
        hover && "transition-all duration-200 hover:border-ice-blue/30 hover:bg-surface-light cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
