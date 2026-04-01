"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1 overflow-x-auto scrollbar-none pb-1",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-label font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 clip-corner-sm cursor-pointer",
            activeTab === tab.id
              ? "bg-ice-blue text-black"
              : "bg-surface text-muted hover:text-white hover:bg-surface-light"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
