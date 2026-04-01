import { Users, MessageCircle } from "lucide-react";
import { buildTeamEnquiryLink } from "@/lib/whatsapp";

export function TeamBanner() {
  return (
    <section className="bg-mmj-red py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 stripe-accent opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 flex items-center justify-center clip-corner-sm shrink-0">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                Pelatih & Manajer Tim
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Dapatkan harga paket khusus untuk kebutuhan tim Anda
              </p>
            </div>
          </div>
          <a
            href={buildTeamEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-mmj-red hover:bg-white/90 px-6 py-3 font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Tanya Paket Tim
          </a>
        </div>
      </div>
    </section>
  );
}
