import { MessageCircle } from "lucide-react";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";

export function TopBar() {
  return (
    <div className="bg-wa-green text-white text-center py-2 px-4">
      <a
        href={buildGeneralEnquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-label font-semibold tracking-wide hover:underline"
      >
        <MessageCircle className="w-4 h-4" />
        Hubungi kami via WhatsApp untuk pemesanan & konsultasi
      </a>
    </div>
  );
}
