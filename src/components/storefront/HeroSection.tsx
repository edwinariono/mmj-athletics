import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Background texture */}
      <div className="absolute inset-0 stripe-accent" />
      <div className="absolute inset-0 bg-gradient-to-b from-ice-blue/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-ice-blue/10 border border-ice-blue/20 px-3 py-1 mb-6 clip-corner-sm">
            <span className="w-1.5 h-1.5 bg-ice-blue rounded-full animate-pulse" />
            <span className="text-ice-blue font-label text-xs font-semibold uppercase tracking-wider">
              Katalog Musim 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] mb-6">
            Lengkapi.{" "}
            <span className="text-ice-blue">Kuasai.</span>
            <br />
            Arena Es.
          </h1>

          {/* Description */}
          <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Peralatan hoki es premium dari brand terpercaya dunia. Dealer resmi
            Bauer & CCM di Indonesia. Jersey kustom untuk tim Anda.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={buildGeneralEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-6 py-3.5 font-label font-semibold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi WhatsApp
            </a>
            <Link
              href="/katalog/helm-pelindung"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white hover:bg-white/5 text-white px-6 py-3.5 font-label font-semibold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
            >
              Lihat Katalog
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 bg-gradient-to-r from-ice-blue via-ice-blue/50 to-transparent" />
    </section>
  );
}
