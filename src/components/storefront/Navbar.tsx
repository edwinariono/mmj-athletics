"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog/helm-pelindung", label: "Katalog" },
  { href: "/jersey-kustom", label: "Jersey Kustom" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-ice-blue clip-corner-sm flex items-center justify-center">
              <span className="text-black font-heading font-bold text-sm">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                MMJ ATHLETICS
              </span>
              <span className="block text-[10px] font-label uppercase tracking-[0.2em] text-muted -mt-1">
                Hockey Outfitters
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label text-sm font-semibold uppercase tracking-wider text-muted hover:text-ice-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Mobile menu */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted hover:text-white transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2 text-muted hover:text-white transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border",
          isOpen ? "max-h-60" : "max-h-0 border-t-0"
        )}
      >
        <div className="px-4 py-3 space-y-1 bg-surface">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 font-label text-sm font-semibold uppercase tracking-wider text-muted hover:text-ice-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
