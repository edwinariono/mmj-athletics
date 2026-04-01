"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  Shirt,
  Users,
  Package,
  FolderOpen,
  BarChart3,
  Contact,
  UsersRound,
  Image,
  Settings,
  Phone,
  UserCog,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Utama",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/enquiry", label: "Pesan Masuk", icon: MessageCircle, badge: 3 },
    ],
  },
  {
    title: "Katalog",
    items: [
      { href: "/admin/produk", label: "Produk", icon: Package },
      { href: "/admin/konten", label: "Banner & Halaman", icon: Image },
    ],
  },
  {
    title: "Pelanggan",
    items: [
      { href: "/admin/kontak", label: "Database Kontak", icon: Contact },
      { href: "/admin/tim", label: "Tim Terdaftar", icon: UsersRound },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { href: "/admin/pengaturan", label: "Pengaturan Situs", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-admin-surface border border-border rounded-sm text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-admin-surface border-r border-border z-40 flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 border-b border-border flex items-center px-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ice-blue clip-corner-sm flex items-center justify-center">
              <span className="text-black font-heading font-bold text-xs">M</span>
            </div>
            <div>
              <span className="font-heading text-sm font-bold tracking-wider text-white">
                MMJ ATHLETICS
              </span>
              <span className="block text-[9px] font-label uppercase tracking-[0.15em] text-muted">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="text-[10px] font-label font-semibold uppercase tracking-[0.2em] text-muted px-3 mb-2">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
                          isActive
                            ? "bg-ice-blue/10 text-ice-blue"
                            : "text-muted hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="font-label font-semibold tracking-wide">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="ml-auto bg-wa-green text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted hover:text-mmj-red hover:bg-mmj-red/5 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="font-label font-semibold tracking-wide">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
