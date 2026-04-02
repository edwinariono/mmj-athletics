import { MessageCircle } from "lucide-react";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";

interface WaCTABannerProps {
  headline?: string;
  description?: string;
}

export function WaCTABanner({ headline, description }: WaCTABannerProps) {
  return (
    <section className="bg-wa-green py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white mb-3">
          {headline || "Tertarik? Langsung Chat Kami!"}
        </h2>
        <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
          {description ||
            "Tanya stok, harga, atau konsultasi peralatan langsung ke tim kami via WhatsApp"}
        </p>
        <a
          href={buildGeneralEnquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-wa-green hover:bg-white/90 px-7 py-3.5 font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 clip-corner-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Chat WhatsApp Sekarang
        </a>
      </div>
    </section>
  );
}
