import Link from "next/link";
import { Phone, Globe, AtSign } from "lucide-react";
import { formatWaNumber } from "@/lib/utils";
import { WA_NUMBER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-lg font-bold tracking-wider mb-3">
              MMJ ATHLETICS
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Hockey Outfitters — Toko peralatan hoki es terlengkap di Indonesia.
            </p>
            <div className="flex items-center gap-2 text-wa-green">
              <Phone className="w-4 h-4" />
              <span className="font-label font-semibold text-sm">
                {formatWaNumber(WA_NUMBER)}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-label font-semibold uppercase tracking-wider text-sm text-muted mb-3">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/katalog/helm-pelindung", label: "Helm & Pelindung" },
                { href: "/katalog/jersey-kustom", label: "Jersey Kustom" },
                { href: "/katalog/base-layer", label: "Base Layer" },
                { href: "/katalog/stik-blade", label: "Stik & Blade" },
                { href: "/katalog/skate-aksesoris", label: "Skate & Aksesoris" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-ice-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-label font-semibold uppercase tracking-wider text-sm text-muted mb-3">
              Ikuti Kami
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-surface-light border border-border rounded-sm flex items-center justify-center text-muted hover:text-ice-blue hover:border-ice-blue/30 transition-colors"
                aria-label="Instagram"
              >
                <AtSign className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-surface-light border border-border rounded-sm flex items-center justify-center text-muted hover:text-ice-blue hover:border-ice-blue/30 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} MMJ Athletics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
