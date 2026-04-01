import { MessageCircle } from "lucide-react";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";

export function FloatingWaButton() {
  return (
    <a
      href={buildGeneralEnquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-wa-green hover:bg-wa-green-hover rounded-full flex items-center justify-center shadow-lg shadow-wa-green/25 transition-all duration-200 hover:scale-110 group"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-wa-green animate-ping opacity-20" />
    </a>
  );
}
